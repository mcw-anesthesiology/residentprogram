@extends("app")

@section("head")
	<style>
		.view, .complete { cursor: pointer }
	</style>
@stop

@section("body")
	<h2 class="sub-header">All Requests</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable" id="keywordsAll" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident/Fellow</th>
					<th>Faculty</th>
					<th>Evaluation Form</th>
					<th>Requested</th>
					<th>Completed</th>
					<th>Status</th>
				</tr>
			</thead>
		</table>
	</div>
@stop

@section("script")
	<script>
		$(document).ready(function(){
			$(".datatable").DataTable({
				"ajax": "dashboard/evaluations",
				deferRendering: true,
				"order": [[0, "desc"]],
				stateSave: true,
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});
		});
	</script>
@stop
