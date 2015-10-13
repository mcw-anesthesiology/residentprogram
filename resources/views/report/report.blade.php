@extends("app")

@section("head")
	<style>
		.graph {
			width: 100%;
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
						@if(!empty($subjectMilestoneDeviations))
							<td> {{ round($subjectMilestoneDeviations[$subject_id][$milestone_id], 2) }}</td>
						@else
							<td>0</td>
						@endif
							<td>{{ $subjectMilestoneEvals[$subject_id][$milestone_id] }}</td>
<?php
	$tsv .= round($subjectMilestone[$subject_id][$milestone_id], 2)."\t";
	if(!empty($subjectMilestoneDeviations))
		$tsv .= round($subjectMilestoneDeviations[$subject_id][$milestone_id], 2)."\t";
	else
		$tsv .= 0;
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
						@if(!empty($subjectCompetencyDeviations))
							<td>{{ round($subjectCompetencyDeviations[$subject_id][$competency_id], 2) }}</td>
						@else
							<td>0</td>
						@endif
							<td>{{ $subjectCompetencyEvals[$subject_id][$competency_id] }}</td>
<?php
	$tsv .= round($subjectCompetency[$subject_id][$competency_id], 2)."\t";
	if(!empty($subjectCompetencyDeviations))
		$tsv .= round($subjectCompetencyDeviations[$subject_id][$competency_id], 2)."\t";
	else
		$tsv .= 0;
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
		<div id="graphs">
			@foreach($graphs as $graph)
				<img class="graph" src="/graph/{{ $graph }}" /><br />
			@endforeach
		</div>
	@else
		<h4>No graphs to show</h4>
	@endif

</div>
@stop

@section("script")
	<script>
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
		});
	</script>
@stop
