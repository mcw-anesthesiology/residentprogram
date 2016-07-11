@extends("app")

@section("body")
	<h1>Case Log</h1>
	<div class="table-responsive">
		<table class="table table-striped" id="case-log-table" width="100%">
			<thead>
				<tr>
					<th>Location</th>
					<th>Date</th>
					<th>Type</th>
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
		// var caseLogTable = $("#case-log-table").DataTable({
		//
		// });
	</script>
@stop
