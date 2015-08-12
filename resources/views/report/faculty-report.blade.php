@extends("app")

@section("head")

@stop

@section("body")
	<table class="table table-striped table-bordered datatable" id="report-table" width="100%">
		<thead>
			<tr>
				<th rowspan="2">Faculty</th>
	@foreach($questions as $question => $nothing)
				<th colspan="3">{{ $question }}</th>
	@endforeach
				<th>Total</th>
			</tr>
			<tr>
	@for($i = 0; $i < count($questions); $i++)
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
		@foreach($questions as $question => $nothing)
			@if(!isset($subjectResponse[$subject_id][$question]) || !$subjectResponse[$subject_id][$question])
				<td></td>
				<td></td>
				<td>0</td>
			@else
				<td>{{ round($subjectResponse[$subject_id][$question], 2) }}</td>
				<td>{{ round($subjectResponseDeviations[$subject_id][$question], 2) }}</td>
				<td>{{ $subjectResponseEvals[$subject_id][$question] }}</td>
			@endif
		@endforeach
				<td>{{ $subjectEvals[$subject_id] }}</td>
			</tr>
	@endforeach
		</tbody>
	</table>
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
