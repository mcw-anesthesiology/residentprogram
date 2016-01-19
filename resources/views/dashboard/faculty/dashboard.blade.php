@extends("app")

@section("head")
	<style>
		.view, .complete { cursor: pointer; }
	</style>
@stop

@section("body")
	@include("dashboard.faculty.".$user->type)
@stop

@section("script")
	<script>
		$(".table").on("click", ".view", function(){
			var requestId = $(this).parents("tr").children("td").eq(0).children("a").html();
			window.location.href = "/evaluation/"+requestId;
		});

		$(".datatable").DataTable({
			"ajax": "/dashboard/faculty/evaluations",
			"order": [[0, "desc"]],
			"createdRow": function(row, data, index){
				$("td", row).addClass("view");
			}
		});
	</script>
@stop
