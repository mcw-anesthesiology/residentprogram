@extends("app")

@section("head")
	<style>
		.view, .complete { cursor: pointer }
	</style>
@stop

@section("body")
	<h2 class="sub-header">Requests</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-pending" id="keywordsPending" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Faculty</th>
					<th>Evaluation Form</th>
					<th>Requested</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>

	<h2 class="sub-header">Completed Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-complete" id="keywordsComplete" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Faculty</th>
					<th>Evaluation Form</th>
					<th>Requested</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="test">

	</div>
@stop

@section("script")
	<script>
		$(document).ready(function(){
			var data = {};
			data.type = "pending";
			data._token = "{{ csrf_token() }}";
			$(".datatable-pending").DataTable({
				"ajax": {
					"url": "dashboard/evaluations",
					"data": data
				},
				deferRendering: true,
				"order": [[0, "desc"]],
				stateSave: true,
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});
			data.type = "complete";
			$(".datatable-complete").DataTable({
				"ajax": {
					"url": "dashboard/evaluations",
					"data": data,
				},
				deferRendering: true,
				"order": [[0, "desc"]],
				stateSave: true,
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});

			$.ajax({
				"url": "dashboard/evaluations",
				"data": data,
				"method": "post",
				success: function(response){
					console.log(response);
				}
			});
		});
	</script>
@stop
