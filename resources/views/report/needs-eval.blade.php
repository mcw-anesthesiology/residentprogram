@extends("app")

@section("head")
	<style>
		.n { background-color: pink !important; }
		.y { background-color: lightgreen !important; }
		.glyphicon-ok { color: green !important; }
		.glyphicon-remove { color: red !important; }
		td { text-align: center; }
	</style>
@stop

@section("body")
	<table class="table table-striped table-bordered datatable">
		<thead>
			<tr>
				<th>Resident/Fellow</th>
				@foreach($milestones as $milestone)
					<th nowrap>{{ $milestone->title }}</th>
				@endforeach
			</tr>
		</thead>
	</table>

	<form style="text-align: center;" method="get" target="_blank" action="/report/needs-eval/tsv">
		<button class="btn btn-default" type="submit">Export TSV</button>
	</form>
@stop

@section("script")
	<script>
		var table = $(".datatable").DataTable({
			"ajax": "/report/needs-eval/get",
			"paging": false,
			"scrollX": true,
			"scrollY": "700px",
			"scrollCollapse": true,
			"columnDefs": [{
				"targets": 0,
				"cellType": "th"
			}]
		});
		new $.fn.DataTable.FixedColumns(table);
	</script>
@stop
