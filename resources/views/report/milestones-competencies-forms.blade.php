@extends("app")

@section("head")
	<style>
		.glyphicon-ok { color: green !important; }
		.glyphicon-remove { color: red !important; }
		td { text-align: center; vertical-align: middle; }
	</style>
@stop

@section("body")
  <h2 class="sub-header">Milestones</h2>
	<table class="table table-striped table-bordered datatable-milestones">
		<thead>
			<tr>
				<th>Milestone</th>
				@foreach($forms as $form)
					<th>{{ $form->title }}</th>
				@endforeach
			</tr>
		</thead>
	</table>
	<form action="/report/milestones-competencies-forms/export/milestones" style="text-align: center">
		{!! csrf_field() !!}
		<button type="submit" class="btn">Export TSV</button>
	</form>

</div>
<div class="container body-block">
	<h2 class="sub-header">Competencies</h2>
	<table class="table table-striped table-bordered datatable-competencies">
		<thead>
			<tr>
				<th>Competency</th>
				@foreach($forms as $form)
					<th>{{ $form->title }}</th>
				@endforeach
			</tr>
		</thead>
	</table>
	<form action="/report/milestones-competencies-forms/export/competencies" style="text-align: center">
		{!! csrf_field() !!}
		<button type="submit" class="btn">Export TSV</button>
	</form>
@stop

@section("script")
	<script>
		$(document).ready(function(){
			var milestones = $(".datatable-milestones").DataTable({
				"ajax": "/report/milestones-competencies-forms/milestones",
				"paging": false,
				"scrollX": true,
				"scrollY": "500px",
				"scrollCollapse": true,
				"columnDefs": [{
					"targets": 0,
					"cellType": "th"
				}]
			});
			new $.fn.DataTable.FixedColumns(milestones);

			var competencies = $(".datatable-competencies").DataTable({
				"ajax": "/report/milestones-competencies-forms/competencies",
				"paging": false,
				"scrollX": true,
				"scrollY": "500px",
				"scrollCollapse": true,
				"columnDefs": [{
					"targets": 0,
					"cellType": "th"
				}]
			});
			new $.fn.DataTable.FixedColumns(competencies);
		});
	</script>
@stop
