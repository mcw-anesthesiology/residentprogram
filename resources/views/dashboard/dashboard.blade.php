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
	          <h4 class="modal-title" id="myModalCancel">Cancel evaluation</h4>
	      </div>
	      <div class="modal-body">
	        Are you sure you want to cancel this evaluation?
	      </div>
	      <div class="modal-footer modal-cancel">
	      	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      	<button type="button" class="btn btn-danger" id="submit-cancel-eval" value="">Cancel evaluation</button>
	      </div>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		$(".table").on("click", ".cancelEval", function(event){
			var id = $(this).data("id");
			$(".modal-cancel #submit-cancel-eval").val(id);
			$(".bs-cancel-modal-sm").modal("toggle");
			event.stopPropagation();
		});

		$("#submit-cancel-eval").click(function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = $(this).val();

			var row = $("#cancel-" + data.id).parents("tr");

			$.post("/evaluation/cancel", data, function(result){
				if(result == "success"){
					if(row.siblings().length == 0){
						var bodyBlock = row.parents(".body-block");
						bodyBlock.fadeOut(function(){
							bodyBlock.html("<h2>You have no pending evaluations</h2>");
							bodyBlock.fadeIn();
						});
					}
					else{
						row.fadeOut(function(){
							$(".datatable-pending").DataTable({
								retrieve: true
							}).row(row).remove().draw();
						});
					}
				}
				else
					alert(result);
			}).fail(function(){
				alert("Error removing evaluation.")
			});

			$(".bs-cancel-modal-sm").modal("toggle");
		});

		$(".table").on("click", ".remove-flag", function(event){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = $(this).data("id");

			var row = $(this).parents("tr");

			$.post("/evaluation/flag/remove", data, function(result){
				if(result == "success")
					if(row.siblings().length == 0)
						row.parents(".body-block").fadeOut(function(){
							$(this).remove();
						});
					else
						row.fadeOut(function(){
							$(".datatable-flagged").DataTable({
								retrieve: true
							}).row(row).remove().draw();
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
				"order": [[0, "desc"]],
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});

			$(".datatable-staff").DataTable({
				"ajax": {
					"url": "dashboard/evaluations/staff",
					"data": data,
					"type": "post"
				},
				"order": [[0, "desc"]],
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});

			$(".datatable-all").DataTable({
				"ajax": "dashboard/evaluations",
				"order": [[0, "desc"]],
				"dom": "lfprtip",
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});

			data.type = "pending";
			$(".datatable-staff-pending").DataTable({
				"ajax": {
					"url": "dashboard/evaluations/staff",
					"data": data,
					"type": "post"
				},
				"order": [[0, "desc"]],
				responsive: {
					details: {
						type: false
					}
				},
				"createdRow": function(row, data, index){
					$("td", row).addClass("view");
				}
			});

			data.type = "complete";
			$(".datatable-staff-complete").DataTable({
				"ajax": {
					"url": "dashboard/evaluations/staff",
					"data": data,
					"type": "post"
				},
				"order": [[0, "desc"]],
				responsive: {
					details: {
						type: false
					}
				},
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
				"order": [[0, "desc"]],
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
				"order": [[0, "desc"]],
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
					"order": [[0, "desc"]],
					"createdRow": function(row, data, index){
						$("td", row).addClass("view");
					}
				});
			});
		});
	</script>
@stop
