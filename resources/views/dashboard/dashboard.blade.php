@extends("app")

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir("css/vue-dashboard.css") }}" />
@endpush

@section("blockless-body")
	<div class="container">
		<alert-list v-model="alerts" />
	</div>

	@include("dashboard.type." . $user->type)

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
	<script src="{{ elixir('js/vue-dashboard.js') }}"></script>
	<script>
		$(document).on("click", ".cancel-eval-button", function(event){
			event.stopPropagation();
			var id = $(this).data("id");
			$(".modal-cancel #submit-cancel-eval").val(id);
			$(".bs-cancel-modal-sm").modal("toggle");
		});

		$(document).on("click", "#submit-cancel-eval", function(event){
			event.preventDefault();
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";

			var evalId = $(this).val();

			var row = $(".cancel-eval-button[data-id='" + evalId + "']").parents("tr");
			var table = row.parents("table");

			$.ajax({
				url: "/evaluations/" + evalId + "/cancel",
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response == "success"){
					if(row.siblings().length == 0){
						var bodyBlock = row.parents(".body-block");
						bodyBlock.velocity("fadeOut", function(){
							bodyBlock.html("<h2>You have no pending evaluations</h2>");
							bodyBlock.velocity("fadeIn");
						});
					}
					else {
						row.velocity("fadeOut", function(){
							$(table).DataTable({
								retrieve: true
							}).row(row).remove().draw().ajax.reload();
						});
					}
				}
				else
					appendAlert(response);
			}).fail(function(){
				appendAlert("Error removing evaluation.");
			});

			$(".bs-cancel-modal-sm").modal("toggle");
		});
	</script>
@stop
