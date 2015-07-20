@extends("app")

@section("head")
	<style>
		.n { background-color: pink !important; }
		.y { background-color: lightgreen !important; }
		td { border: solid 1px black; }
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
@stop

@section("script")
	<script>
		var table = $(".datatable").DataTable({
			"ajax": "/manage/needs-eval/get",
			"paging": false,
			"scrollX": true,
			"scrollY": "700px",
			"scrollCollapse": true
		});
		new $.fn.DataTable.FixedColumns(table);
	</script>
@stop
