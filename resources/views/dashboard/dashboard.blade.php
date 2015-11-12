@extends("app")

@section("head")
	<style>
		.view, .complete { cursor: pointer; }
	</style>
@stop

@section("body")
	@include("dashboard.".$user->type)

	<!-- Cancel Modal -->
	<div class="modal fade bs-cancel-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          <h4 class="modal-title" id="myModalCancel">Cancel Evaluation</h4>
	      </div>
	      <div class="modal-body">
	        You have selected to <b>cancel</b> this evaluation. Would you like to continue?
	      </div>
	      <div class="modal-footer modal-cancel">
	    <form method="post" action="/evaluation/cancel">
			{!! csrf_field() !!}
	      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      <button type="submit" class="btn btn-danger" id="id" name="id" value="">Confirm</button>
	        </form>
	      </div>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		$(".table").on("click", ".cancelEval", function(event){
			// event.preventDefault();
			var id = $(this).data("id");
			$(".modal-cancel #id").val(id);
			$(".bs-cancel-modal-sm").modal();
			event.stopPropagation();
		});

		$(".table").on("click", ".remove-flag", function(event){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = $(this).data("id");

			var row = $(this).parents("tr");

			$.post("/evaluation/flag/remove", data, function(result){
				if(result == "success")
					if(row.siblings().length == 0)
						row.parents(".body-block").fadeOut(300, function(){
							$(this).remove();
						});
					else
						row.fadeOut(300, function(){
							$(this).remove();
						});
				else
					alert("Error: " + result);
			}).fail(function(){
				alert("Error removing flag");
			});
			event.stopPropagation();
		});

		$(".table").on("click", ".view", function(){
			var requestId = $(this).parents("tr").children("td").eq(0).children("a").html();
			window.location.href = "/evaluation/"+requestId;
		});

		$(document).ready(function(){
			var data = {};
			data._token = "{{ csrf_token() }}";

			$(".datatable-flagged").DataTable({
				"ajax": {
					"url": "dashboard/evaluations/flagged",
					"data": data,
					"type": "post"
				},
				deferRendering: true,
				"order": [[0, "desc"]],
				stateSave: true,
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});

			$(".datatable-all").DataTable({
				"ajax": "dashboard/evaluations",
				deferRendering: true,
				"order": [[0, "desc"]],
				stateSave: true,
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});

			data.type = "pending";
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

			data.type = "mentor";
			$(".datatable-mentee").each(function(){
				data.mentee_id = $(this).data("id");
				$(this).DataTable({
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
			});
		});
	</script>
@stop
