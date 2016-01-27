@extends("app")

@section("head")
	<!--[if lte IE 8]>
		<script type="text/javascript" src="/js/excanvas.js"></script>
	<![endif]-->
	<link href="/css/bootstrap-switch.min.css" rel="stylesheet" />
	<link href="/css/report-chartjs.css" rel="stylesheet" />
@stop

@section("body")
	<table class="table" width="100%">
		<thead>
			<tr>
				<th>Start Date</th>
				<th>End Date</th>
				<th>Training Level</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{ $startDate->toFormattedDateString() }}</td>
				<td>{{ $endDate->toFormattedDateString() }}</td>
				<td>{{ $trainingLevel }}</td>
			</tr>
		</tbody>
	</table>
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
	@if(count($graphs) > 0)
	<div class="form-horizontal new-graphs-container">
		<div class="form-group">
			<label for="new-graphs" class="col-sm-2 col-sm-offset-4">Interactive graphs</label>
			<div class="col-sm-2">
				<input type="checkbox" id="new-graphs" checked />
			</div>
		</div>
		<br />
		<div class="form-group graph-type-container">
			<label for="graph-type" class="col-sm-2 col-sm-offset-4">Graph type</label>
			<div class="col-sm-2">
				<select id="graph-type" class="form-control">
					<option value="radar">Radar</option>
					<option value="line">Line</option>
					<option value="bar">Bar</option>
				</select>
			</div>
		</div>
		<div class="form-group graph-layout-container">
			<label for="graph-layout" class="col-sm-2 col-sm-offset-4">Graph layout</label>
			<div class="col-sm-2">
				<input type="checkbox" id="graph-layout" data-on-text="Vertical" data-off-text="Horizontal"
					data-on-color="primary" data-off-color="primary" />
			</div>
		</div>
	</div>
	<div class="img-graphs">
		@foreach($graphs as $graph)
			<img class="img-graph" src="/graph/{{ $graph }}" /><br />
		@endforeach
	</div>
	<div class="graphs"></div>
	@else
		<h4>No graphs to show</h4>
	@endif
@stop

@section("script")
	<script>
	@if($graphOption != "none")
		var reportData = [];
		reportData[0] = {};
		var graphOption = "{{ $graphOption }}";
		reportData[0].trainingLevel = "{{ $trainingLevel }}";
		reportData[0].subjects = {!! json_encode($subjects) !!};
		@if($graphOption == "all")
		reportData[0].subjectMilestone = {!! json_encode($subjectMilestone) !!};
		reportData[0].subjectCompetency = {!! json_encode($subjectCompetency) !!};
		@endif
		reportData[0].averageMilestone = {!! json_encode($averageMilestone) !!};
		reportData[0].averageCompetency = {!! json_encode($averageCompetency) !!};
		reportData[0].milestones = {!! json_encode($milestones) !!};
		reportData[0].competencies = {!! json_encode($competencies) !!};
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

			new $.fn.DataTable.FixedColumns(reportTable);

			$(".img-graphs").hide();

			$("#new-graphs").bootstrapSwitch();
			$("#graph-layout").bootstrapSwitch();

			if(graphOption == "average")
				drawAverageRadarGraphs();
			else if(graphOption == "all")
				drawAllRadarGraphs();

		});
	</script>
@stop
