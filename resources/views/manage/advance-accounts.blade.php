@extends("app")

@section("head")
	<style>
		.advance-accounts-selected-users {
			max-height: 300px;
			overflow-y: auto;
		}

		.advance-accounts-section .row {
			margin-top: 40px;
		}

		.summary-container {
			font-size: 24px;
		}

		.input-group.date .input-group-addon.disabled,
		.input-group.date .glyphicon.disabled {
			cursor: not-allowed;
		}
	</style>
@stop

@section("body")
	<h1>Advance accounts</h1>
	<section class="advance-accounts-section" id="advance-accounts-container">
		<h2 class="sub-header">Advancing users</h2>
		<div class="row">
			<div class="col-md-4">
				<h3>Intern</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="advance-intern-table" width="100%">
						<thead>
							<tr>
								<th>Advance</th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected interns</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="intern"></ul>
				</section>
			</div>
			<div class="col-md-4">
				<h3>CA-1</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="advance-ca-1-table" width="100%">
						<thead>
							<tr>
								<th>Advance</th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-1s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-1"></ul>
				</section>
			</div>
			<div class="col-md-4">
				<h3>CA-2</h3>
				<div class="table-responsive">
					<table class="table table-striped" id="advance-ca-2-table" width="100%">
						<thead>
							<tr>
								<th>Advance</th>
								<th>Name</th>
								<th>View</th>
							</tr>
						</thead>
					</table>
				</div>
				<hr />
				<section class="selected-users-container">
					<h3>Selected CA-2s</h3>
					<ul class="advance-accounts-selected-users list-group" data-type="ca-2"></ul>
				</section>
			</div>
		</div>
		<section id="advancing-users-summary-container">
			<div class="row summary-container">
				<div class="col-sm-3">
					<span>Advancing users:</span>
				</div>
				<div class="col-sm-9">
					<span id="num-advancing-users"></span>
				</div>
			</div>
			<div class="row" id="advance-run-at-container">
				<div class="col-sm-4 col-sm-offset-1 col-md-offset-2">
					<div class="form-group">
						<label for="advance-run-now-checkbox">Advance time</label>
						<div class="input-group">
							<input type="checkbox" id="advance-run-now-checkbox" name="run_at" value="now" />
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4">
					<div class="form-group">
						<label for="advance-run-at">Scheduled advancement time</label>
						<div class="input-group date" id="advance-run-at-group">
							<input type="text" class="form-control" id="advance-run-at" name="run_at" />
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-lg btn-primary center-block" id="advance-users-button">
						<span class="glyphicon glyphicon-share-alt"></span> Advance
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="center-block" id="advance-users-alert-container">

					</div>
				</div>
			</div>
		</section>
	</section>
</div>

<div class="container body-block">
	<section class="advance-accounts-section" id="graduate-accounts-container">
		<h2 class="sub-header">Graduating/Leaving users</h2>
		<div class="row">
			<div class="col-md-4">
				<h3>CA-3</h3>
			</div>
			<div class="col-md-4">
				<h3>Fellow</h3>
			</div>
			<div class="col-md-4">
				<h3>Faculty</h3>
			</div>
		</div>
	</section>
</div>

<div class="container body-block">
	<section id="pending-advancements-container">
		<h2 class="sub-header">Pending advancements</h2>
		<div class="table-responsive">
			<table class="table table-striped" id="pending-advancements-table" width="100%">
				<thead>
					<tr>
						<th>User</th>
						<th>Action</th>
						<th>Scheduled for</th>
						<th></th>
					</tr>
				</thead>
			</table>
		</div>
	</section>

	<div class="modal fade" id="view-user-modal" tabindex="-1" role="dialog" aria-labelledby="view-user-modal-title" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="view-user-modal-title">View user</h4>
	      </div>
	      <div class="modal-body">
	        <row>
				<img src="" alt="" id="view-user-photo" />
			</row>
			<row>
				<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-0">
					<span id="view-user-name"></span>
				</div>
				<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-0">
					<span id="view-user-email"></span>
				</div>
				<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-0">
					<span id="view-user-type"></span>
				</div>
			</row>
	      </div>
	      <div class="modal-footer">
			<a href="" target="_blank" role="button" class="btn btn-info" id="view-user-view-profile-button"><span class="glyphicon glyphicon-link"></span> View profile</a>
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		var advancingUsers = {};
		var graduatingUsers = {};

		var internTable = $("#advance-intern-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "intern",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca1Table = $("#advance-ca-1-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-1",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var ca2Table = $("#advance-ca-2-table").DataTable({
			ajax: {
				url: "/users",
				data: {
					type: "resident",
					training_level: "ca-2",
					status: "active"
				},
				dataSrc: ""
			},
			columns: [
				{data: null, orderable: false, searchable: false, render: renderAdvanceCheckbox},
				{data: "full_name"},
				{data: null, orderable: false, searchable: false, render: renderViewButton}
			],
			paging: false,
			scrollY: "400px",
			order: [[1, "asc"]],
			dom: "ft"
		});

		var pendingAdvancementsTable = $("#pending-advancements-table").DataTable({
			ajax: {
				url: "/advancements",
				data: {
					user: true,
					complete: false
				},
				dataSrc: ""
			},
			columns: [
				{data: "user.full_name"},
				{data: null, render: function(advancement){
					if(advancement.advanced_field === "training_level"){
						return "Advance to " + advancement.advanced_value.toUpperCase();
					}
					else if(advancement.advanced_field === "status"){
						if(advancement.advanced_value === "inactive")
							return "Graduate (disable account)";
						else
							return "Enable account";
					}
					else
						return "Unknown";
				}},
				{data: "run_at", render: renderTableDate, createdCell: createDateTimeCell},
				{data: null, orderable: false, searchable: false, render: function(advancement, type){
					return '<button type="button" class="btn btn-xs btn-danger" '
						+ 'data-id="' + advancement.id + '">'
						+ '<span class="glyphicon glyphicon-remove"></span> '
						+ 'Cancel</button>';
				}}
			],
			order: [[2, "asc"]]
		});

		var advancingTables = [
			internTable,
			ca1Table,
			ca2Table
		];

		$("#advance-accounts-container").on("change", ".advance-user-checkbox", selectAdvancingUser);

		var nextDefaultAdvancementDate = moment();
		if(nextDefaultAdvancementDate.month() >= 6)
			nextDefaultAdvancementDate.add(1, "year");
		nextDefaultAdvancementDate.month(6).date(1).hour(4).minute(0).second(0);

		$("#advance-run-at-group").datetimepicker({
			useCurrent: false,
			defaultDate: nextDefaultAdvancementDate,
			minDate: moment(),
			stepping: 60,
			format: "M/D/Y h A"
		});

		$("#advance-run-now-checkbox").bootstrapSwitch({
			onText: "Now",
			offText: "Scheduled"
		});

		$("#advance-run-now-checkbox").on("switchChange.bootstrapSwitch", function(event, state){
			if(state){
				$("#advance-run-at-group").find("*")
					.prop("disabled", true).addClass("disabled");
			}
			else {
				$("#advance-run-at-group").find("*")
					.prop("disabled", false).removeClass("disabled");
			}
		});

		// $(document).on("click", ".view-user-button", function(){
		// 	// TODO
		// });

		$("#advance-users-button").click(function(){
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");

			var runNow = $("#advance-run-at").prop("disabled");
			var scheduledRunAt = $("#advance-run-at-group")
				.data("DateTimePicker").date().format("Y-MM-DD HH:mm:ss");

			var data = {
				_token: "{{ csrf_token() }}",
				advanced_field: "training_level",
				advanced_value: null,
				run_at: runNow ? "now" : scheduledRunAt,
				user_ids: Object.keys(advancingUsers)
			};

			console.log(data.run_at);

			$.ajax({
				url: "/advancements/many",
				method: "POST",
				data: data
			}).done(function(response){
				var advancementResult = runNow ? "run" : "scheduled";
				if(response.successes.length > 0){
					response.successes.forEach(function(userId){
						highlightSelectedUser(userId, "success");
						delete advancingUsers[userId];
					});
					if(response.errors.length === 0 && response.failedRuns.length === 0){
						appendAlert("All advancements were successfully " + advancementResult,
							"#advance-users-alert-container", "success");
					}
					else {
						appendAlert("Some advancements were successfully " + advancementResult,
							"#advance-users-alert-container", "success");
					}
					if(runNow){
						advancingTables.forEach(function(table){
							table.ajax.reload();
						});
					}
				}
				if(response.failedRuns.length > 0){
					response.failedRuns.forEach(function(userId){
						highlightSelectedUser(userId, "warning");
					});
					appendAlert("Some advancements were successfully created, but not run successfully",
						"#advance-users-alert-container", "warning");
				}
				if(response.errors.length > 0){
					response.errors.forEach(function(userId){
						highlightSelectedUser(userId, "danger");
					});
					appendAlert("Some advancements were not successfully created or " + advancementResult,
						"#advance-users-alert-container");
				}
				pendingAdvancementsTable.ajax.reload();
			}).fail(function(err){
				Object.keys(advancingUsers).forEach(function(userId){
					highlightSelectedUser(userId, "danger");
				});
				appendAlert("There was a problem advancing users. No users were advanced",
					"#advance-users-alert-container");
			}).always(function(){
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		function selectAdvancingUser(){
			selectUser($(this), advancingUsers);
			updateUserCount($("#num-advancing-users"), advancingUsers);
		}

		function selectGraduatingUser(){
			selectUser($(this), graduatingUsers);
			updateUserCount($("#num-graduating-users"), graduatingUsers);
		}

		function selectUser(c, collection){
			var type;
			if(c.data("type") === "resident")
				type = c.data("trainingLevel");
			else
				type = c.data("type");

			if(c.prop("checked")){
				collection[c.data("id")] = {
					id: c.data("id"),
					name: c.data("name"),
					email: c.data("email"),
					photo: c.data("photo"),
					type: c.data("type"),
					training_level: c.data("trainingLevel")
				};
				var listGroup = $(".advance-accounts-selected-users[data-type='" + type + "']");
				listGroup.find(".selected-user.list-group-item-success").remove();
				listGroup.append('<li class="list-group-item selected-user" data-id="' + c.data("id") + '">' + c.data("name") + '</li>');
			}
			else {
				delete collection[c.data("id")];
				$(".selected-user[data-id='" + c.data("id") + "']").remove();
			}
		}

		function highlightSelectedUser(userId, context){
			$(".selected-user[data-id='" + userId + "']")
				.addClass("list-group-item-" + context);
		}

		function updateUserCount(container, collection){
			container.text(Object.keys(collection).length);
		}

		function renderAdvanceCheckbox(user){
			return '<input type="checkbox" class="advance-user-checkbox" '
				+ 'data-id="' + user.id + '" data-name="' + user.full_name + '" data-email="' + user.email + '" '
				+ 'data-photo="' + user.photo_path + '" data-type="' + user.specific_type + '" '
				+ 'data-training-level="' + user.training_level + '" '
				+ 'name="users[]" value="' + user.id + '" />';
		}

		function renderViewButton(user){ // TODO: Enable
			return '<button type="button" class="btn btn-xs btn-info view-user-button disabled" '
			 	+ 'data-id="' + user.id + '" data-name="' + user.full_name + '" data-email="' + user.email + '" '
				+ 'data-photo="' + user.photo_path + '" data-type="' + user.specific_type + '" '
				+ 'data-training-level="' + user.training_level + '" title="Coming soon" disabled>'
				+ '<span class="glyphicon glyphicon-user"></span> View</button>';
		}
	</script>
@stop
