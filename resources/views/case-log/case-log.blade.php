@extends("app")

@section("head")
	<style>
		#case-log-table tr {
			cursor: pointer;
		}
	</style>
@stop

@section("body")
	<h1>Case Log</h1>
	<div class="table-responsive">
		<table class="table table-striped" id="case-log-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
	@if(!$user->isType("resident"))
					<th>Trainee</th>
	@endif
					<th>Location</th>
					<th>Date</th>
					<th>Type</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
	<button type="button" class="btn btn-primary center-block" id="add-case-log-button">
		<span class="glyphicon glyphicon-plus"></span>
		Add entry
	</button>
</div>

<div class="container body-block collapse" id="view-case-log-entry-container">
	<button type="button" class="close close-body-block-button" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
	<h2>View entry</h2>
	@include("case-log.pieces.base")

	<section id="view-case-log-details"></section>

	@if($user->isType("resident"))
</div>
<div class="container body-block collapse" id="add-case-log-entry-container">
	<button type="button" class="close hide-body-block-button" aria-label="Close">
		<span aria-hidden="true">&minus;</span>
	</button>
	@include("case-log.add-entry")
	@endif
@stop

@section("script")
	<script>
		var caseLogTable = $("#case-log-table").DataTable({
			ajax: {
				url: "/case_logs",
				data: {
					with: {
						location: ["name"],
						user: ["full_name"]
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "id"},
	@if(!$user->isType("resident"))
				{data: "user.full_name"},
	@endif
				{data: "location.name"},
				{data: "case_date", render: function(caseDate, type){
					if(type === "sort" || type === "type")
						return caseDate ? moment(caseDate).valueOf() : "";

					return caseDate ? moment(caseDate).format("ll") : "";
				}},
				{data: "details_type", render: function(detailsType){
					if(detailsType)
						return detailsType.toUpperCase();

					return "";
				}},
				{data: null, orderable: false, searchable: false, render: function(caseLog, type){
					var buttons = "";

	@if($user->isType("admin"))
					buttons += '<button type="button" class="btn btn-xs btn-danger delete-case-log-button" '
						+ 'data-id="' + caseLog.id + '"><span class="glyphicon glyphicon-remove"></span> '
						+ 'Delete</button>';
	@endif
					return buttons;
				}}
			],
			order: [[0, "desc"]]
		});

		$("#add-case-log-entry-container .datetimepicker").datetimepicker({
			defaultDate: moment(),
			stepping: 1440,
			format: "M/D/Y"
		});

		$("#add-case-log-button").click(function(){
			var form = $("#case-entry-form");
			form.parent().velocity("slideDown");
		});

		$("#case-log-table").on("click", "tr", function(){
			var caseLog = caseLogTable.row(this).data();
			var container = $("#view-case-log-entry-container");
			container.find("select[name='location_id']").val(caseLog.location_id).change();
			container.find("input[name='case_date']").val(moment(caseLog.case_date).format("ll")).change();
			container.find("textarea[name='comment']").val(caseLog.comment);

			var viewDetailsContainer = document.getElementById("view-case-log-details");
			while(viewDetailsContainer.firstChild)
				viewDetailsContainer.removeChild(viewDetailsContainer.firstChild);
			renderCaseLogDetailsSchema(caseLog.details, viewDetailsContainer);
			container.find("input, select").prop("disabled", true);
			container.find("textarea").prop("readonly", true);
			container.velocity("fadeIn");
		});

		$("#case-entry-form").submit(function(event){
			event.preventDefault();
			try {
				var form = $(this);
				var button = $(this).find("button[type='submit']");
				button.prop("disabled", true).addClass("disabled");
				var caseDate = $("#add-case-log-entry-container .datetimepicker")
					.data("DateTimePicker").date();
				if(!caseDate)
					throw new Error("Invalid date");
				$(this).find("input[name='case_date']")
					.val(caseDate.format("Y-MM-DD"));

				var data = $(this).serializeArray();
				var action = $(this).attr("action");
				var method = $(this).attr("method");
				$.ajax({
					url: action,
					method: method,
					data: data
				}).done(function(response){
					if(response === "success"){
						caseLogTable.ajax.reload();
						form[0].reset();
						form.parent().velocity("slideUp");
					} else {
						appendAlert("There was a problem saving the entry, please reload the page and try again. "
							+ "If this continues please let me know at {{ config("app.admin_email") }}.", form.parent());
					}
				}).fail(function(err){
					appendAlert("There was a problem saving the entry, please reload the page and try again. "
						+ "If this continues please let me know at {{ config("app.admin_email") }}.", form.parent());
				}).always(function(){
					button.prop("disabled", false).removeClass("disabled");
				});
			} catch(e){
				var alertMessage = "There was a problem submitting the entry, please check your selections. ";
				if(e.message === "Invalid date")
					alertMessage = "Invalid date, please use the picker or make sure it's formatted as (MM/DD/YYYY). ";
				appendAlert(alertMessage + "If this continues please let me know at {{ config("app.admin_email") }}.", form.parent());
			}
		});

	@if($user->isType("admin"))
		$("#case-log-table").on("click", ".delete-case-log-button", confirmDeletion);

		$("#case-log-table").on("click", ".confirm-delete.delete-case-log-button", function(event){
			event.stopPropagation();
			var caseLogId = $(this).data("id");
			var data = {
				_token: "{{ csrf_token() }}",
				_method: "DELETE"
			};
			var button = $(this);

			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				url: "/case_logs/" + caseLogId,
				method: "POST", // DELETE
				data: data
			}).done(function(response){
				if(response === "success")
					caseLogTable.ajax.reload();
				else
					appendAlert("There was a problem removing the case log");
			}).fail(function(err){
				appendAlert("There was a problem removing the case log");
			}).always(function(){
				if(button)
					button.prop("disabled", false).removeClass("disabled");
			});
		});
	@endif
	</script>
@stop
