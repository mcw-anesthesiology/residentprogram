@extends("app")

@section("body")
	<h1>Case Log</h1>
	<div class="table-responsive">
		<table class="table table-striped" id="case-log-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Location</th>
					<th>Date</th>
					<th>Type</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
</div>

<div class="container body-block">
	@include("case-log.add-entry")
@stop

@section("script")
	<script>
		var caseLogTable = $("#case-log-table").DataTable({
			ajax: {
				url: "/case_logs",
				data: {
					with: {
						location: ["name"]
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "location.name"},
				{data: "case_date", render: renderDateCell, createdCell: createDateCell},
				{data: "details_type"},
				{data: null, render: function(){
					return "";
				}}
			],
			order: [[0, "desc"]]
		});
	</script>
@stop
