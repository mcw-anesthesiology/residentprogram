@extends("app")

@section("head")
	<style>
		#case-log-schema-schema {
			resize: vertical;
			white-space: pre;
			word-wrap: normal;
			overflow: auto;
		}
	</style>
@stop

@section("body")
	<h1>Manage Case Log</h1>
	@include("manage.case-log.locations")
</div>

<div class="container body-block">
	@include("manage.case-log.schemas")
@stop

@push("modals")
	<div class="modal fade" id="add-edit-case-log-modal" tabindex="-1" role="dialog" aria-labelledby="add-edit-case-log-modal-title" aria-hidden="true">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <form role="form" method="post" id="add-edit-case-log-form">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="PATCH" disabled />
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="add-edit-case-log-modal-title"></h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="add-edit-case-log-name">Name</label>
					<input type="text" class="form-control" name="name" id="add-edit-case-log-name" placeholder="Name" />
				</div>
				<div class="form-group">
					<label for="add-edit-case-log-type">Type</label>
					<select class="form-control" name="type" id="add-edit-case-log-type" placeholder="Select type">
						<option value="" disabled selected>Select type</option>
						<option value="neuraxial">Neuraxial</option>
						<option value="peripheral">Peripheral</option>
					</select>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-primary"></button>
			</div>
		  </form>
		</div>
	  </div>
	</div>
@endpush

@section("script")
	<script>
		var locationsTable = $("#locations-table").DataTable({
			ajax: {
				url: "/locations",
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "name"},
				{data: null, render: function(location){
					var editButton = '<button type="button" class="btn btn-xs btn-info edit-case-log-button" '
						+ 'data-id="' + location.id + '" data-name="' + location.name + '" data-case-log-type="location">'
						+ '<span class="glyphicon glyphicon-edit"></span> Edit</button>';

					var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-case-log-button" '
						+ 'data-id="' + location.id + '" data-case-log-type="location">'
						+ '<span class="glyphicon glyphicon-remove"></span> Delete</button>';

					return editButton + ' ' + deleteButton;
				}}
			],
			order: [[0, "asc"]]
		});

		var schemasTable = $("#case-log-details-schemas-table").DataTable({
			ajax: {
				url: "/case_log_details_schemas",
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "details_type"},
				{data: "version"},
				{data: null, render: function(detailsSchema){
					var buttons = createEditAndDeleteButtons({}, "case-log-details-schema");
					return buttons[0];
				}}
			],
			order: [[0, "desc"]]
		});

		$(document).on("click", ".edit-case-log-button", function(){
			var form = $("#add-edit-case-log-form");
			var action, title, type;
			switch($(this).data("caseLogType")){
				case "location":
					action = "/locations/";
					title = "Edit location";
					type = false;
					break;
			}
			action += $(this).data("id");

			form.attr("action", action);
			form.data("caseLogType", $(this).data("caseLogType"));
			form.find("input[name='_method']").prop("disabled", false);
			form.find("button[type='submit']")
				.removeClass("btn-success").addClass("btn-info")
				.html('<span class="glyphicon glyphicon-pencil"></span> Edit');
			$("#add-edit-case-log-modal-title").text(title);

			$("#add-edit-case-log-name").val($(this).data("name"));
			if(type){
				$("#add-edit-case-log-type").val($(this).data("type"))
					.parents(".form-group").show();
			}
			else {
				$("#add-edit-case-log-type").parents(".form-group").hide();
			}

			$("#add-edit-case-log-modal").modal("show");
		});

		$(".add-case-log-button").click(function(){
			var form = $("#add-edit-case-log-form");
			var action, title, type;
			switch($(this).data("caseLogType")){
				case "location":
					action = "/locations";
					title = "Add location";
					type = false;
					break;
			}
			form.attr("action", action);
			form.data("caseLogType", $(this).data("caseLogType"));
			form.find("input[name='_method']").prop("disabled", true);
			form.find("button[type='submit']")
				.removeClass("btn-info").addClass("btn-success")
				.html('<span class="glyphicon glyphicon-plus"></span> Add');
			$("#add-edit-case-log-modal-title").text(title);

			$("#add-edit-case-log-name").val("");
			if(type){
				$("#add-edit-case-log-type").val("")
					.prop("disabled", false)
					.parents(".form-group").show();
			}
			else {
				$("#add-edit-case-log-type").prop("disabled", true)
					.parents(".form-group").hide();
			}

			$("#add-edit-case-log-modal").modal("show");
		});

		$("#add-edit-case-log-form").submit(function(event){
			event.preventDefault();
			var button = $(this).find("button[type='submit']");
			var table, type;
			switch($(this).data("caseLogType")){
				case "location":
					table = locationsTable;
					type = "location";
					break;
			}
			button.prop("disabled", true).addClass("disabled");

			var action = $(this).attr("action");
			var data = $(this).serialize();
			$.ajax({
				url: action,
				method: "POST", // maybe PATCH
				data: data
			}).done(function(response){
				if(response === "success"){
					table.ajax.reload();
					$("#add-edit-case-log-modal").modal("hide");
				}
				else
					appendAlert("There was a problem saving the " + type);
			}).fail(function(err){
				appendAlert("There was a problem saving the " + type);
			}).always(function(){
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$(document).on("click", ".delete-case-log-button", function(){
			$(".confirm-delete-case-log-button").removeClass("confirm-delete-case-log-button")
				.html('<span class="glyphicon glyphicon-remove"></span> Delete');
			$(this).addClass("confirm-delete-case-log-button")
				.html('<span class="glyphicon glyphicon-remove"></span> Confirm delete');
		});

		$(document).on("click", ".confirm-delete-case-log-button", function(){
			var action, table, type;
			switch($(this).data("caseLogType")){
				case "location":
					action = "/locations/";
					table = locationsTable;
					type = "location";
					break;
			}
			action += $(this).data("id");

			var data = {
				_token: "{{ csrf_token() }}",
				_method: "DELETE"
			};
			$.ajax({
				url: action,
				method: "POST", // DELETE
				data: data
			}).done(function(response){
				if(response === "success")
					table.ajax.reload();
				else
					appendAlert("There was a problem deleting the " + type);
			}).fail(function(err){
				appendAlert("There was a problem deleting the " + type);
			});
		});

		$("#case-log-details-schemas-table").on("click", ".edit-case-log-details-schema-button", function(){
			var row = $(this).parents("tr");
			var detailsSchema = schemasTable.row(row).data();
			$("#case-log-schema-version").val(detailsSchema.version + 1);
			$("#case-log-schema-details-type").val(detailsSchema.details_type);
			$("#case-log-schema-schema").text(JSON.stringify(detailsSchema.schema));
			$("#add-case-log-details-schema-modal").modal("show");
		});
	</script>
@stop
