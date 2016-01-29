@extends("app")

@section("body")
	<div class="table-responsive">
		<table class="table table-striped datatable" id="pager-directory" width="100%">
			<thead>
				<tr>
					<th>Name</th>
					<th>Pager</th>
				</tr>
			</thead>
		</table>
	</div>
@stop

@section("script")
	<script>
		$("#pager-directory").DataTable({
			ajax: "/directory/get"
		});
	</script>
@stop
