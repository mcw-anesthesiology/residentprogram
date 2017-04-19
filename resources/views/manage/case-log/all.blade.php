@extends("app")

@section("head")
	<style>
		.case-log-details-schema-schema {
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
		var detailsSchemas = {!! $schemas->toJson() !!};
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

		$(".case-log-details-schema-version").change(function(){
			var type = $(this).data("type");
			var version = $(this).val();
			var schema = detailsSchemas[type][version].schema;
			$(this).parents(".view-case-log-details-schema")
				.find(".case-log-details-schema-schema")
				.val(JSON.stringify(schema, null, 4));
		});

		$(".case-log-details-schemas-form").submit(function(event){
			event.preventDefault();
			var form = $(this);
			var button = form.find("button[type='submit']");
			var schemaGroup = form.find(".case-log-details-schema-schema")
				.parents(".form-group");

			try {
				var type = form.find("input[name='details_type']").val();
				var version = parseInt(form.find("input[name='version']").val(), 10);
				var schema = JSON.parse(form.find(".case-log-details-schema-schema").val());
				if(!caseLogDetailsSchemaIsValid(schema))
					throw new Error("Schema invalid");

				button.prop("disabled", true).addClass("disabled");
				$.ajax({
					url: form.attr("action"),
					method: form.attr("method"),
					data: form.serializeArray()
				}).done(function(response){
					if(response === "success"){
						detailsSchemas[type][version] = {
							type: type,
							version: version,
							schema: schema
						}
						form.parents(".panel-body").find(".case-log-details-schema-version")
							.prepend('<option>' + version + '</option>').val(version).change();
						form.find("input[name='version']").val(version + 1);
						form.find(".case-log-details-schema-schema").val("");
					}
					else
						appendAlert("There was a problem saving the schema. Please verify the JSON is valid and matches "
							+ "<a href='/schemas/case-log-details.json' target='_blank'>the schema</a>.", schemaGroup);
				}).fail(function(err){
					appendAlert("There was a problem saving the schema. Please verify the JSON is valid and matches "
						+ "<a href='/schemas/case-log-details.json' target='_blank'>the schema</a>.", schemaGroup);
				}).always(function(){
					button.prop("disabled", false).removeClass("disabled");
				});
			} catch(err){
				schemaGroup.addClass("has-error");
				appendAlert("There was a problem saving the schema. Please verify the JSON is valid and matches "
					+ "<a href='/schemas/case-log-details.json' target='_blank'>the schema</a>.", schemaGroup);
			}
		});

		$(".case-log-details-delete-schema-type-form").submit(function(event){
			event.preventDefault();
			var form = $(this);
			var button = form.find("button[type='submit']");
			if(!button.hasClass("confirm-delete")){
				button.addClass("confirm-delete")
					.html('<span class="glyphicon glyphicon-remove"></span> Confirm delete');
				appendAlert('<span class="glyphicon glyphicon-alert"></span> '
					+ 'This will prevent users from submitting logs with this details type. Are you sure?', form, undefined, false);
				return;
			}

			button.prop("disabled", true).addClass("disabled");

			var action = form.attr("action");
			var method = form.attr("method");
			var data = form.serializeArray();
			$.ajax({
				url: action,
				method: method, // DELETE
				data: data
			}).done(function(response){
				if(response === "success"){
					var panel = form.parents(".panel");
					panel.velocity("slideUp", function(){
						panel.remove();
					});
				}
				else
					appendAlert("There was a problem deleting the details type.", form);
			}).fail(function(err){
				appendAlert("There was a problem deleting the details type.", form);
			}).always(function(){
				if(button)
					button.prop("disabled", false).removeClass("disabled");
			});
		});

		$(".case-log-details-schemas-form").on("input", ".has-error .case-log-details-schema-schema", function(){
			$(this).parents(".form-group").removeClass("has-error");
		});
	</script>
@stop
