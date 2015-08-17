@extends("app")

@section("head")
	<style>
		.graph {
			width: 100%;
		}
	</style>
@stop

@section("body")
	<table class="table">
		<thead>
			<th>Start Date</th>
			<th>End Date</th>
			<th>Report Form</th>
		</thead>
		<tbody>
			<td>{{ $startDate->format("d-M-Y") }}</td>
			<td>{{ $endDate->format("d-M-Y") }}</td>
			<td><a href="{{ url("/manage/forms/".$reportForm) }}" target="_blank">{{ $reportFormTitle }}</a></td>
		</tbody>
	</table>

	<table class="table table-striped table-bordered datatable" id="report-table" width="100%">
		<thead>
			<tr>
				<th rowspan="2">Faculty</th>
	@foreach($questions as $question => $nothing)
				<th colspan="3">{{ ucfirst($question) }}</th>
	@endforeach
				<th colspan="3">Recommendation</th>
				<th colspan="2">Total</th>
			</tr>
			<tr>
	@for($i = 0; $i < count($questions); $i++)
				<th>Average</th>
				<th>Std. Dev.</th>
				<th>#</th>
	@endfor
				<th>Yes</th>
				<th>No</th>
				<th>%</th>
				<th># Residents</th>
				<th># Evals</th>
			</tr>
		</thead>
		<tbody>
	@foreach($subjects as $subject_id => $subject_name)
			<tr>
				<td>{{ $subject_name }}</td>
		@foreach($questions as $question)
			@if(!isset($subjectResponse[$subject_id][$question]) || !$subjectResponse[$subject_id][$question])
				<td></td>
				<td></td>
				<td>0</td>
			@else
				<td>{{ round($subjectResponse[$subject_id][$question], 2) }}</td>
				<td>{{ isset($subjectResponseDeviations) ? round($subjectResponseDeviations[$subject_id][$question], 2) : "" }}</td>
				<td>{{ $subjectResponseEvals[$subject_id][$question] }}</td>
			@endif
		@endforeach
				<td>{{ $recommendations[$subject_id]["yes"] or 0 }}</td>
				<td>{{ $recommendations[$subject_id]["no"] or 0 }}</td>
				<td>{{ isset($recommendations[$subject_id]["yes"]) ? round(($recommendations[$subject_id]["yes"]/count($subjectEvals[$subject_id])*100), 2) : 0 }}%</td>
				<td>{{ count($subjectEvaluators[$subject_id]) }}</td>
				<td>{{ count($subjectEvals[$subject_id]) }}</td>
			</tr>
	@endforeach
		</tbody>
	</table>

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
<div class="container body-block">
	@if(isset($subjectTextResponses))
		<table class="table table-striped table-bordered datatable" id="text-responses-table" width="100%">
			<thead>
				<tr>
					<th>Evaluation</th>
					<th>Faculty</th>
					<th>Resident</th>
					<th>Question</th>
					<th>Evaluation Date</th>
					<th>Comment</th>
				</tr>
			</thead>
			<tbody>
		@foreach($subjectTextResponses as $response)
				<tr>
					<th><a href="{{ url("/evaluation/".$response->evaluation_id) }}">{{ $response->evaluation_id }}</a></th>
					<th>{{ $response->subject_last }}, {{ $response->subject_first }}</th>
					<td>{{ $response->evaluator_last }}, {{ $response->evaluator_first }}</td>
					<td>{{ ucfirst($response->question_id) }}</td>
					<td>{{ $response->evaluation_date }}</td>
					<td>{{ $response->response }}</td>
				</tr>
		@endforeach
			</tbody>
		</table>
	@else
		<h4>No text responses to show</h4>
	@endif
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
