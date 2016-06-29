@extends("app")

@section("head")
	<style>
		.advance-accounts-selected-users {
			max-height: 300px;
			overflow-y: auto;
		}
	</style>
@stop

@section("body")
	<h1>Advance accounts</h1>
	<section id="advance-accounts-container">
		<h2 class="sub-header"></h2>
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
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<h3>Selected interns</h3>
				<ul class="advance-accounts-selected-users list-group" data-type="intern"></ul>
			</div>
			<div class="col-md-4">
				<h3>Selected CA-1s</h3>
				<ul class="advance-accounts-selected-users list-group" data-type="ca-1"></ul>
			</div>
			<div class="col-md-4">
				<h3>Selected CA-2s</h3>
				<ul class="advance-accounts-selected-users list-group" data-type="ca-2"></ul>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-3">
				<span>Advancing users:</span>
			</div>
			<div class="col-sm-9">
				<span id="num-advancing-users"></span>
			</div>
		</div>
		<div class="row" id="advance-datetime-container">
			<div class="form-group">
                <div class="input-group date" id="advance-datetime">
                    <input type="text" class="form-control" />
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
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
	</section>
</div>

<div class="container body-block">
	<section id="graduate-accounts-container">
		<h2 class="sub-header"></h2>
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

		$("#advance-intern-table").DataTable({
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

		$("#advance-ca-1-table").DataTable({
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

		$("#advance-ca-2-table").DataTable({
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

		$("#advance-accounts-container").on("change", ".advance-user-checkbox", selectAdvancingUser);

		var nextDefaultAdvancementDate = moment();
		if(nextDefaultAdvancementDate.month() > 5 ||
				(nextDefaultAdvancementDate.month() === 5 && nextDefaultAdvancementDate.date() >= 30))
			nextDefaultAdvancementDate.add(1, "year");
		nextDefaultAdvancementDate.month(5).date(30).hour(4).minute(0).second(0);
		console.log(nextDefaultAdvancementDate);
		$("#advance-datetime").datetimepicker({
			useCurrent: false,
			defaultDate: nextDefaultAdvancementDate,
			minDate: moment(),
			stepping: 60,
			format: "M/D/Y h A"
		});

		// $(document).on("click", ".view-user-button", function(){
		// 	// TODO
		// });

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
				$(".advance-accounts-selected-users[data-type='" + type + "']")
					.append('<li class="list-group-item selected-user" data-id="' + c.data("id") + '">' + c.data("name") + '</li>');
			}
			else {
				delete collection[c.data("id")];
				$(".selected-user[data-id='" + c.data("id") + "']").remove();
			}
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
