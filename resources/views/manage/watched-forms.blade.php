@extends("app")

@section("body")
	<h1 class="sub-header">Watched forms <button type="button" class="btn btn-sm btn-success" id="add-watched-form-button"><span class="glyphicon glyphicon-plus"></span> Add watched form</button></h1>
	<div class="table-responsive">
		<table class="table table-striped" id="watched-forms-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>User</th>
					<th>Form</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>

	<div class="modal fade" id="add-watched-form-modal" role="dialog" aria-labelledby="add-watched-form-title" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form class="form" id="watched-forms-form" action="/watched_forms" method="POST">
					{!! csrf_field() !!}
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title" id="add-watched-form-title">Watched Form</h4>
					</div>
					<div class="modal-body">
						@include("models.watched-forms", [
							"idPrefix" => "add",
							"formGroups" => $formGroups,
							"userGroups" => $userGroups
						])
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="submit" class="btn btn-success">Add watched form</button>
					</div>
				</form>
			</div>
		</div>
	</div>
@stop

@section("script")
	<script>
		var watchedFormsDatatable = $("#watched-forms-table").DataTable({
			ajax: {
				url: "/watched_forms/",
				data: {
					user: true,
					form: true
				},
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "user.full_name"},
				{data: "form.title"},
				{data: function(row){
					return '<button type="button" class="btn btn-xs btn-danger delete-watched-form-button" data-id="'
						+ row.id + '"><span class="glyphicon glyphicon-remove"></span> Delete</button>';
				}}
			]
		});

		$("#add-watched-form-button").click(function(){
			$("#add-watched-form-modal").modal("show");
		});

		$("#watched-forms-table").on("click", ".delete-watched-form-button", function(){
			$("#watched-forms-table .confirm-delete-watched-form-button")
				.removeClass("confirm-delete-watched-form-button")
				.html('<span class="glyphicon glyphicon-remove"></span> Delete');
			$(this).addClass("confirm-delete-watched-form-button")
				.html('<span class="glyphicon glyphicon-alert"></span> Confirm delete');
		});

		$("#watched-forms-table").on("click", ".confirm-delete-watched-form-button", function(){
			var watchedFormId = $(this).data("id");
			var data = {};
			data._token = "{{ csrf_token() }}";

			var row = $(this).parents("tr");
			var button = $(this);
			$(this).prop("disabled", true).addClass("disabled");
			$.ajax({
				url: "/watched_forms/" + watchedFormId,
				data: data,
				method: "DELETE"
			}).done(function(response){
				button.prop("disabled", false).removeClass("disabled");
				if(response === "success"){
					$("#add-watched-form-modal").modal("hide");
					row.velocity("fadeOut", function(){
						watchedFormsDatatable.ajax.reload();
					});
				}
				else {
					appendAlert(response, "#add-watched-form-modal .modal-header");
					button.prop("disabled", false).removeClass("disabled");
				}
			}).fail(function(response){
				appendAlert(response, "#add-watched-form-modal .modal-header");
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#watched-forms-form").submit(function(event){
			event.preventDefault()
			var submitButton = $(this).find("button[type='submit']");
			submitButton.prop("disabled", true).addClass("disabled");

			var data = $(this).serialize() + "&ajax=true";
			var action = $(this).attr("action");
			var method = $(this).attr("method");

			$.ajax({
				url: action,
				method: method,
				data: data
			}).done(function(response){
				submitButton.prop("disabled", false).removeClass("disabled");
				if(response === "success"){
					watchedFormsDatatable.ajax.reload();
					$("#add-watched-form-modal").modal("hide");
				}
				else
					appendAlert(response, "#add-watched-form-modal .modal-header");
			}).fail(function(response){
				appendAlert(response, "#add-watched-form-modal .modal-header");
				submitButton.prop("disabled", false).removeClass("disabled");
			});
		});
	</script>
@stop
