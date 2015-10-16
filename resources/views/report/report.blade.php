@extends("app")

@section("head")
	<style>
		#graphs:nth-child(odd){
			background-color: #f9f9f9;
			padding: 10px;
		}
	</style>
@stop

@section("body")
<?php $tsv = "Resident/Fellow\t"; ?>
	<table class="table table-striped table-bordered datatable" id="report-table" width="100%">
		<thead>
			<tr>
				<th rowspan="3">Resident/Fellow</th>
				<th colspan="{{ 3*count($milestones) }}">Milestones</th>
				<th colspan="{{ 3*count($competencies) }}">Competencies</th>
				<th colspan="2">All</th>
			</tr>
			<tr>
				@foreach($milestones as $milestone_title)
					<th colspan="3">{{ $milestone_title }}</th>
<?php
	$tsv .= $milestone_title." Avg.\t".$milestone_title." Std. Dev.\t".$milestone_title." #\t";
?>
				@endforeach
				@foreach($competencies as $competency_title)
					<th colspan="3">{{ $competency_title }}</th>
<?php
	$tsv .= $competency_title." Avg.\t".$competency_title." Std. Dev.\t".$competency_title." #\t";
?>
				@endforeach
				<th colspan="2">Total</th>
			</tr>
			<tr>
				@for($i = 0; $i < (count($milestones)+count($competencies)); $i++)
					<th>Average</th>
					<th>Std. Dev.</th>
					<th>#</th>
				@endfor
				<th># Faculty</th></th>
				<th># Evals</th>
<?php $tsv .= "Total # Faculty\t"; ?>
<?php $tsv .= "Total # Evals\n"; ?>
			</tr>
		</thead>
		<tbody>
			@foreach($subjects as $subject_id => $subject_name)
				<tr>
					<td>{{ $subject_name }}</td>
<?php $tsv .= $subject_name."\t"; ?>
					@foreach($milestones as $milestone_id => $milestone_title)
						@if(!isset($subjectMilestoneEvals[$subject_id][$milestone_id]) || $subjectMilestoneEvals[$subject_id][$milestone_id] == 0)
							<td></td>
							<td></td>
							<td>0</td>
<?php $tsv .= "0\t0\t0\t"; ?>
						@else
							<td>{{ round($subjectMilestone[$subject_id][$milestone_id], 2) }}</td>
							<td> {{ round($subjectMilestoneDeviations[$subject_id][$milestone_id], 2) }}</td>
							<td>{{ $subjectMilestoneEvals[$subject_id][$milestone_id] }}</td>
<?php
	$tsv .= round($subjectMilestone[$subject_id][$milestone_id], 2)."\t";
	$tsv .= round($subjectMilestoneDeviations[$subject_id][$milestone_id], 2)."\t";
	$tsv .= $subjectMilestoneEvals[$subject_id][$milestone_id]."\t";
?>
						@endif
					@endforeach
					@foreach($competencies as $competency_id => $competency_title)
						@if(!isset($subjectCompetencyEvals[$subject_id][$competency_id]) || $subjectCompetencyEvals[$subject_id][$competency_id] == 0)
							<td></td>
							<td></td>
							<td>0</td>
<?php $tsv .= "0\t0\t0\t"; ?>
						@else
							<td>{{ round($subjectCompetency[$subject_id][$competency_id], 2) }}</td>
							<td>{{ round($subjectCompetencyDeviations[$subject_id][$competency_id], 2) }}</td>
							<td>{{ $subjectCompetencyEvals[$subject_id][$competency_id] }}</td>
<?php
	$tsv .= round($subjectCompetency[$subject_id][$competency_id], 2)."\t";
	$tsv .= round($subjectCompetencyDeviations[$subject_id][$competency_id], 2)."\t";
	$tsv .= $subjectCompetencyEvals[$subject_id][$competency_id]."\t";
?>
						@endif
					@endforeach
					<td>{{ count($subjectEvaluators[$subject_id]) }}</td></td>
					<td>{{ count($subjectEvals[$subject_id]) }}</td>
<?php $tsv .= count($subjectEvaluators[$subject_id])."\t"; ?>
<?php $tsv .= count($subjectEvals[$subject_id])."\n"; ?>
				</tr>
			@endforeach
		</tbody>
	</table>
	<form style="text-align: center" method="post" target="_blank" action="/report/export">
		{!! csrf_field() !!}
		<input type="hidden" name="name" value="Aggregate Report" />
		<input type="hidden" name="data" value="{{ $tsv }}" />
		<button class="btn btn-default" type="submit">Export TSV</button>
	</form>

</div>
<div class="container body-block">
	<div id="graphs"></div>
@stop

@section("script")
	<script src="/js/underscore-min.js"></script>
	<script src="/js/Chart.js"></script>
	<script>
	@if($graphOption != "none")
		var subjects = {!! json_encode($subjects) !!};
		@if($graphOption == "all")
		var subjectMilestone = {!! json_encode($subjectMilestone) !!};
		var subjectCompetency = {!! json_encode($subjectCompetency) !!};
		@endif
		var averageMilestone = {!! json_encode($averageMilestone) !!};
		var averageCompetency = {!! json_encode($averageCompetency) !!};
		var milestones = {!! json_encode($milestones) !!};
		var competencies = {!! json_encode($competencies) !!};
		var milestoneLabels = _.values(milestones);
		var averageMilestones = _.values(averageMilestone);
		var competencyLabels = _.values(competencies);
		var averageCompetencies = _.values(averageCompetency);

		var options = {
			responsive: true,
			// datasetStrokeWidth: 3,
			angleLineWidth: 2,
			// angleLineColor: "rgba(0,0,0,0.85)",
			// scaleLineColor: "rgba(0,0,0,0.85)",
			scaleShowLabels: true,
			scaleOverride: true,
			scaleLineWidth: 2,
			scaleSteps: 5,
			scaleStepWidth: 2,
			scaleStartValue: 0,
			scaleLabel: function(values){
				var scaleLabels = ["", "PGY-1", "CA-1", "CA-2", "CA-3", "Attending"];
				return scaleLabels[values.value/2];
			}
		};

		function drawGraphs(milestoneData, competencyData, title){
			var graphs = document.getElementById("graphs");
			var row = document.createElement("div");
			row.className = "graph-container";
			var h3 = document.createElement("h3");
			h3.appendChild(document.createTextNode(title));
			row.appendChild(h3);

			var milestoneGraph = document.createElement("div");
			milestoneGraph.className = "graph milestone-graph";
			var milestoneCanvas = document.createElement("canvas");
			milestoneCanvas.width = 800;
			milestoneCanvas.height = 400;
			milestoneGraph.appendChild(milestoneCanvas);
			row.appendChild(milestoneGraph);

			var competencyGraph = document.createElement("div");
			competencyGraph.className = "graph competency-graph";
			var competencyCanvas = document.createElement("canvas");
			competencyCanvas.width = 800;
			competencyCanvas.height = 400;
			competencyGraph.appendChild(competencyCanvas);
			row.appendChild(competencyGraph);

			graphs.appendChild(row);

			var mRadar = new Chart(milestoneCanvas.getContext("2d")).Radar(milestoneData, options);
			var cRadar = new Chart(competencyCanvas.getContext("2d")).Radar(competencyData, options);
		}
	@endif

		$(document).ready(function(){
			var reportTable = $("#report-table").DataTable({
				"order": [[0, "asc"]],
				stateSave: true,
				"dom": "lfprtip",
				"scrollX": true,
				"scrollY": "500px",
				"scrollCollapse": true,
				"paging": false
			});
			if(reportTable.length > 0)
				new $.fn.DataTable.FixedColumns(reportTable);


	@if($graphOption != "none")

			var averageMilestoneDataset = {
				label: "Average Performance",
				fillColor: "rgba(227,227,0,0.2)",
				strokeColor: "rgba(227,227,0,1)",
				pointColor: "rgba(227,227,0,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(227,227,0,1)",
				data: averageMilestones
			};

			var averageCompetencyDataset = {
				label: "Average Performance",
				fillColor: "rgba(227,227,0,0.2)",
				strokeColor: "rgba(227,227,0,1)",
				pointColor: "rgba(227,227,0,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(227,227,0,1)",
				data: averageCompetencies
			};

		@if($graphOption == "average")
			var milestoneData = {
				labels: milestoneLabels,
				datasets: [
					averageMilestoneDataset
				]
			};

			var competencyData = {
				labels: competencyLabels,
				datasets: [
					averageCompetencyDataset
				]
			}

			drawGraphs(milestoneData, competencyData, "Title");

		@elseif($graphOption == "all")
			for(subjectId in subjects){
				var milestoneData = {
					labels: milestoneLabels,
					datasets: [
						averageMilestoneDataset,
						{
							label: "Individual Performance",
							fillColor: "rgba(227,0,0,0.2)",
							strokeColor: "rgba(227,0,0,1)",
							pointColor: "rgba(227,0,0,1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(227,0,0,1)",
							data: _.values(subjectMilestone[subjectId])
						}
					]
				};

				var competencyData = {
					labels: competencyLabels,
					datasets: [
						averageCompetencyDataset,
						{
							label: "Individual Performance",
							fillColor: "rgba(227,0,0,0.2)",
							strokeColor: "rgba(227,0,0,1)",
							pointColor: "rgba(227,0,0,1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(227,0,0,1)",
							data: _.values(subjectCompetency[subjectId])
						}
					]
				};

				drawGraphs(milestoneData, competencyData, subjects[subjectId]);
			}
		@endif
	@endif

		});
	</script>
@stop
