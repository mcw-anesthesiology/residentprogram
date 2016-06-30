@extends("app")

@section("head")
	<style>
		.selected-alumni {
			max-height: 300px;
			overflow-y: auto;
		}

		#import-from-users-summary-container {
			margin-top: 40px;
			margin-bottom: 40px;
		}

		#import-from-users-summary {
			font-size: 24px;
		}

		#import-alumni-from-users-button {
			margin-top: 40px;
		}

		#import-from-users-alert-container {
			margin-top: 40px;
		}

		#import-from-users-alert-container > div {
			margin-top: 20px;
		}
	</style>
@stop

@section("body")
	<h1>Import alumni</h1>
	<h2 class="sub-header">Import from spreadsheet</h2>
	<form>
		<input type="file" />
		<button type="submit" class="btn btn-primary btn-lg disabled" disabled>Coming soon!</button>
	</form>

</div>
<div class="container body-block" id="import-from-users-container">
	<h2 class="sub-header">Import from current users</h2>
	<div class="row">
		<div class="col-md-6 col-lg-4">
			<h3>Residents</h3>
			<div class="table-responsive">
				<table class="table table-striped" id="import-alumni-residents-table" width="100%">
					<thead>
						<tr>
							<th>Import</th>
							<th>Name</th>
							<th>Level</th>
						</tr>
					</thead>
				</table>
			</div>
			<hr />
			<section class="selected-alumni-container">
				<h4>Selected residents</h4>
				<ul class="selected-alumni list-group" data-type="resident">

				</ul>
			</section>
		</div>

		<div class="col-md-6 col-lg-4">
			<h3>Fellows</h3>
			<div class="table-responsive">
				<table class="table table-striped" id="import-alumni-fellows-table" width="100%">
					<thead>
						<tr>
							<th>Import</th>
							<th>Name</th>
						</tr>
					</thead>
				</table>
			</div>
			<hr />
			<section class="selected-alumni-container">
				<h4>Selected fellows</h4>
				<ul class="selected-alumni list-group" data-type="fellow">

				</ul>
			</section>
		</div>

		<div class="col-md-6 col-lg-4">
			<h3>Faculty</h3>
			<div class="table-responsive">
				<table class="table table-striped" id="import-alumni-faculty-table" width="100%">
					<thead>
						<tr>
							<th>Import</th>
							<th>Name</th>
						</tr>
					</thead>
				</table>
			</div>
			<hr />
			<section class="selected-alumni-container">
				<h4>Selected faculty</h4>
				<ul class="selected-alumni list-group" data-type="faculty">

				</ul>
			</section>
		</div>
	</div>
	<section id="import-from-users-summary-container">
		<div class="row" id="import-from-users-summary">
			<div class="col-sm-4">
				<p>
					Users selected:
				</p>
			</div>
			<div class="col-sm-8">
				<span id="num-selected-alumni">0</span>
			</div>
		</div>

		<div class="row">
			<h3>Graduation date</h3>
			<div class="row" id="import-from-users-graduation-date-container"></div>
		</div>

		<div class="row">
			<button type="button" class="btn btn-lg btn-primary center-block" id="import-alumni-from-users-button">
				<span class="glyphicon glyphicon-import"></span> Import
			</button>
		</div>
		<div class="row" id="import-from-users-alert-container">

		</div>
	</div>
@stop

@section("script")
	<script>
		var selectedUsers = {};
		$("#import-alumni-residents-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					status: "active",
					type: "resident",
					"training_level[]": ["intern", "ca-1", "ca-2", "ca-3"]
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderImportAlumniCheckbox},
				{data: "full_name"},
				{data: "training_level", render: function(trainingLevel){
					if(trainingLevel.indexOf("ca-") !== -1)
						return trainingLevel.toUpperCase();
					else
						return ucfirst(trainingLevel);
				}}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft",
		});

		$("#import-alumni-fellows-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					status: "active",
					type: "resident",
					training_level: "fellow"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderImportAlumniCheckbox},
				{data: "full_name"}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		$("#import-alumni-faculty-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					status: "active",
					type: "faculty"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderImportAlumniCheckbox},
				{data: "full_name"}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		$("#import-from-users-container").on("change", ".import-alumni-checkbox", function(){
			var type = $(this).data("type");
			var id = $(this).val();
			var name = $(this).data("name");
			if($(this).prop("checked")){
				var listGroup = $(".selected-alumni[data-type='" + type + "']");
				listGroup.find(".selected-alum.list-group-item-success, .selected-alum.list-group-item-warning")
					.remove();
				listGroup.append("<li class='list-group-item selected-alum' data-id='" + id + "'>" + name + "</li>");
				selectedUsers[id] = { id: id, type: type, name: name };
			}
			else {
				$(".selected-alumni[data-type='" + type + "']")
					.find("li[data-id='" + id + "']")
					.remove();
				delete selectedUsers[id];
			}
			updateSelectedUsersCount();
		});

		addDateSelectors("graduation_date", "import-from-users-graduation-",
			"#import-from-users-graduation-date-container", 5, true);
		$("#import-from-users-graduation-date-day").change();

		$("#import-alumni-from-users-button").click(function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.users = selectedUsers;
			data.graduation_date = $("#import-from-users-graduation-date").val();

			var button = $(this);
			button.prop("disabled", true).addClass("disabled");

			$.ajax({
				url: "/alumni/import/users",
				method: "POST",
				data: data
			}).done(function(response){
				if(response.successes.length > 0){
					for(var i = 0; i < response.successes.length; i++){
						deselectAlum(response.successes[i]);
						highlightSelectedUser(response.successes[i], "success");
					}
					if(response.notFound.length === 0 && response.errors.length === 0){
						appendAlert("All users were successfully imported, and have been deselected. "
									+ "Be sure to still disable the user accounts when they are finished.",
							"#import-from-users-alert-container", "success");
					}
					else {
						appendAlert("Some users were successfully added, their checkboxes have been deselected.",
							"#import-from-users-alert-container", "success");
					}
				}
				if(response.notFound.length > 0){
					for(var i = 0; i < response.notFound.length; i++){
						deselectAlum(response.notFound[i]);
						highlightSelectedUser(response.notFound[i], "warning");
					}
					appendAlert("Some users were not found, any erroneous checkboxes have been deselected",
						"#import-from-users-alert-container", "warning");
				}
				if(response.errors.length > 0){
					for(var i = 0; i < response.errors.length; i++){
						highlightSelectedUser(resopnse.errors[i], "danger");
					}
					appendAlert("There were problems adding some users, unsuccessful users are still selected above.",
						"#import-from-users-alert-container");
				}
			}).fail(function(err){
				appendAlert("There was a problem importing users. No users were imported.",
					"#import-from-users-alert-container");
			}).always(function(){
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		function deselectAlum(userId){
			$(".import-alumni-checkbox[value='" + userId + "']")
				.prop("checked", false);
			delete selectedUsers[userId];
		}

		function highlightSelectedUser(userId, context){
			$(".selected-alum[data-id='" + userId + "']")
				.addClass("list-group-item-" + context);
		}

		function renderImportAlumniCheckbox(user){
			return '<input type="checkbox" class="import-alumni-checkbox" '
				+ 'data-type="' + user.specific_type + '" data-name="' + user.full_name + '" '
				+ 'name="users[]" value="' + user.id + '" />';
		}

		function updateSelectedUsersCount(){
			$("#num-selected-alumni").text(Object.keys(selectedUsers).length);
		}
	</script>
@stop
