@extends("app")

@section("body")
	@include("dashboard.faculty.".$user->type)
@stop

@section("script")
	<script>
		$(".datatable").DataTable({
			"ajax": "/dashboard/faculty/evaluations",
			"order": [[0, "desc"]],
			"createdRow": function(row, data, index){
				$("td", row).addClass("view-evaluation");
			}
		});
	</script>
@stop
