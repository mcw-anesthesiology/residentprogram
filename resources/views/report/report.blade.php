@extends("app")

@section("body")
	<table class="table table-striped table-bordered datatable" id="report-table" width="100%">
		<thead>
			<tr>
				<th rowspan="3">Resident/Fellow</th>
				<th colspan="{{ 3*count($milestones) }}">Milestones</th>
				<th colspan="{{ 3*count($competencies) }}">Competencies</th>
				<th>All</th>
			</tr>
			<tr>
				@foreach($milestones as $milestone_title)
					<th colspan="3">{{ $milestone_title }}</th>
				@endforeach
				@foreach($competencies as $competency_title)
					<th colspan="3">{{ $competency_title }}</th>
				@endforeach
				<th>Total</th>
			</tr>
			<tr>
				@for($i = 0; $i < (count($milestones)+count($competencies)); $i++)
					<th>Average</th>
					<th>Std. Dev.</th>
					<th>#</th>
				@endfor
				<th># Evals</th>
			</tr>
		</thead>
		<tbody>
			@foreach($subjects as $subject_id => $subject_name)
				<tr>
					<td>{{ $subject_name }}</td>
					@foreach($milestones as $milestone_id => $milestone_title)
						<td>{{ round($subjectMilestone[$subject_id][$milestone_id], 2) }}</td>
						<td>{{ round($subjectMilestoneDeviations[$subject_id][$milestone_id], 2) }}</td>
						<td>{{ $subjectMilestoneEvals[$subject_id][$milestone_id] }}</td>
					@endforeach
					@foreach($competencies as $competency_id => $competency_title)
						<td>{{ round($subjectCompetency[$subject_id][$competency_id], 2) }}</td>
						<td>{{ round($subjectCompetencyDeviations[$subject_id][$competency_id], 2) }}</td>
						<td>{{ $subjectCompetencyEvals[$subject_id][$competency_id] }}</td>
					@endforeach
					<td>{{ $subjectEvals[$subject_id] }}</td>
				</tr>
			@endforeach
		</tbody>
	</table>
	<!-- TODO: tsv -->

	<hr />
	<div id="graphs">
		@foreach($graphs as $graph)
			<img class="graph" src="/graph/{{ $graph }}" /><br />
		@endforeach
	</div>
	@if($reportType == "specific")
		<hr />
		<table class="table table-striped datatable" width="100%">
			<thead>
				<tr>
					<th>Faculty</th>
					<th>Comment</th>
				</tr>
			</thead>
			<tbody>
				@foreach($subjectTextResponses as $evaluator_name => $response)
					<td>{{ $evaluator_name }}</td>
					<td>{{ $response }}</td>
				@endforeach
			</tbody>
		</table>
	@endif
@stop

@section("script")
	<script>
		$(document).ready(function(){
			$(".datatable").DataTable({
				"order": [[0, "asc"]],
				stateSave: true,
				"dom": "lfprtip",
				"scrollX": true,
			});
		});
	</script>
@stop
