@extends("app")

@section("head")
	<style>
		.filter-row {
			margin-bottom: 20px;
		}

		.filter-row .refresh-container {
			text-align: center;
			height: 100%;
			padding: 20px;
		}

		.filter-row .refresh-table-glyph {
			vertical-align: middle;
			font-size: 24px;
			transform: rotate(0deg);
			transition: transform 0.3s;
		}

		.filter-row .refresh-table-glyph:hover {
			transform: rotate(180deg);
		}
	</style>
@stop

@section("blockless-body")
<div class="container body-block">
	<nav class="jump-to-container">
		<ul class="jump-to-items nav nav-pills nav-justified">
			<li role="presentation"><a href="#residents-heading">Residents</a></li>
			<li role="presentation"><a href="#fellows-heading">Fellows</a></li>
			<li role="presentation"><a href="#faculty-heading">Faculty</a></li>
			<li role="presentation"><a href="#staff-heading">Staff</a></li>
			<li role="presentation"><a href="#admin-heading">Administrator</a></li>
		</ul>
	</nav>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header" id="residents-heading">Residents  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="resident" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="row filter-row">
			<div class="col-xs-1 pull-right refresh-container">
				<span role="button" title="Refresh" class="glyphicon glyphicon-refresh refresh-table-glyph" data-toggle="tooltip" data-table="#manage-resident-table"></span>
			</div>
			<div class="col-sm-3 pull-right">
				<label for="filter-residents-by-status">Status</label>
				<select class="form-control table-filter-select" data-filter-column="4" data-filter-table="#manage-resident-table" id="filter-residents-by-status">
					<option value="">All</option>
					<option>Active</option>
					<option>Inactive</option>
				</select>
			</div>
				<label for="filter-residents-by-training-level">Training Level</label>
				<div class="col-sm-3 pull-right">
				<select class="form-control table-filter-select" data-filter-column="3" data-filter-table="#manage-resident-table" id="filter-residents-by-training-level">
					<option value="">All</option>
					<option>Intern</option>
					<option>CA-1</option>
					<option>CA-2</option>
					<option>CA-3</option>
				</select>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table table-striped account-table" data-type="resident" id="manage-resident-table" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Training Level</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header" id="fellows-heading">Fellows  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="fellow" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="row filter-row">
			<div class="col-xs-1 pull-right refresh-container">
				<span role="button" title="Refresh" class="glyphicon glyphicon-refresh refresh-table-glyph" data-toggle="tooltip" data-table="#manage-fellow-table"></span>
			</div>
			<div class="col-sm-3 pull-right">
				<label for="filter-fellows-by-status">Status</label>
				<select class="form-control table-filter-select" data-filter-column="3" data-filter-table="#manage-fellow-table" id="filter-fellows-by-status">
					<option value="">All</option>
					<option>Active</option>
					<option>Inactive</option>
				</select>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table table-striped account-table" data-type="fellow" id="manage-fellow-table" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Specialty</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header" id="faculty-heading">Faculty  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="faculty" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="row filter-row">
			<div class="col-xs-1 pull-right refresh-container">
				<span role="button" title="Refresh" class="glyphicon glyphicon-refresh refresh-table-glyph" data-toggle="tooltip" data-table="#manage-faculty-table"></span>
			</div>
			<div class="col-sm-3 pull-right">
				<label for="filter-faculty-by-status">Status</label>
				<select class="form-control table-filter-select" data-filter-column="3" data-filter-table="#manage-faculty-table" id="filter-faculty-by-status">
					<option value="">All</option>
					<option>Active</option>
					<option>Inactive</option>
				</select>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table table-striped account-table" data-type="faculty" id="manage-faculty-table" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header" id="app-heading">
			APP
			<button class="addUser btn btn-success btn-xs"
					data-toggle="modal" data-target=".bs-add-modal"
					data-id="app" id="addBtn">
				<span class="glyphicon glyphicon-plus"></span>
				Add new
			</button>
		</h2>
		<div class="row filter-row">
			<div class="col-xs-1 pull-right refresh-container">
				<span role="button" title="refresh"
					class="glyphicon glyphicon-refresh refresh-table-glyph"
					data-toggle="tooltip" data-table="#manage-app-table">
				</span>
			</div>
			<div class="col-sm-3 pull-right">
				<label class="containing-label">
					Status
					<select class="form-control table-filter-select"
							id="filter-app-by-status"
							data-filter-column="3"
							data-filter-table="#manage-app-table">
						<option value="">All</option>
						<option>Active</option>
						<option>Inactive</option>
					</select>
				</label>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table table-striped account-table" data-type="app" id="manage-app-table" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header" id="staff-heading">Staff  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="staff" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="row filter-row">
			<div class="col-xs-1 pull-right refresh-container">
				<span role="button" title="refresh"
					class="glyphicon glyphicon-refresh refresh-table-glyph"
					data-toggle="tooltip" data-table="#manage-staff-table">
				</span>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table table-striped account-table" data-type="staff" id="manage-staff-table" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header" id="external-heading">External  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="external" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="row filter-row">
			<div class="col-xs-1 pull-right refresh-container">
				<span role="button" title="refresh"
					class="glyphicon glyphicon-refresh refresh-table-glyph"
					data-toggle="tooltip" data-table="#manage-external-table">
				</span>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table table-striped account-table" data-type="external" id="manage-external-table" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>


<div class="container body-block">
	<div class="row">
		<h2 class="sub-header" id="admin-heading">Administrator  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="admin" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped account-table" data-type="admin" id="manage-admin-table" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<!-- Edit Modal -->
<div class="modal fade bs-edit-modal" tabindex="-1" role="dialog" aria-labelledby="modalEdit" aria-hidden="true" id="editModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalEdit">Edit Account</h4>
      </div>
      <form id="edit-form" enctype="multipart/form-data" method="POST" action="/users" data-id="">
		  {!! csrf_field() !!}
		<input type="hidden" name="_method" value="PUT" />
        <div class="modal-body modal-edit">
          <div class="form-group" id="edit-username-container">
            <label for="edit-username">Username</label>
            <input type="text" class="form-control" id="edit-username" name="username" readonly>
          </div>
          <div class="form-group">
			<label for="edit-email">Email</label>
			<input type="email" class="form-control" id="edit-email" name="email" required>
          </div>
          <div class="form-group">
            <label for="edit-first-name">First Name</label>
            <input type="text" class="form-control" id="edit-first-name" name="first_name" required>
          </div>
          <div class="form-group">
            <label for="edit-last-name">Last Name</label>
            <input type="text" class="form-control" id="edit-last-name" name="last_name" required>
          </div>
          <div class="form-group" id="edit-training-level-container">
            <label for="edit-training-level">Training Level</label>
            <select class="form-control" id="edit-training-level" name="training_level">
				<option value="intern">Intern</option>
				<option value="ca-1">CA-1</option>
				<option value="ca-2">CA-2</option>
				<option value="ca-3">CA-3</option>
				<option value="fellow">Fellow</option>
			</select>
          </div>
		  <div class="form-group" id="edit-secondary-training-level-container">
			<label for="edit-secondary-training-level">Specialty</label>
			<input type="text" class="form-control" id="edit-secondary-training-level" name="secondary_training_level" />
		  </div>
          <div class="form-group" id="edit-photo-container">
			<label for="edit-photo">Photo</label>
			<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
			<input type="file" accept="image/*" class="form-control" id="edit-photo" name="photo" />
			<div  style="text-align: center;">
				<img id="photo-preview" src="" width="150px" />
			</div>
          </div>
		  <div class="form-group">
            <label for="edit-type">Account Type</label>
            <input type="text" class="form-control account-type" id="edit-type" readonly>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-info">Edit account</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Add Modal -->
<div class="modal fade bs-add-modal" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true" id="addModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalAdd">Add Account</h4>
      </div>
      <form id="add-form" enctype="multipart/form-data" method="POST" action="/users">
		{!! csrf_field() !!}
        <div class="modal-body modal-add">
          <div class="form-group" id="add-username-container">
            <label for="add-username">Username</label>
            <input type="text" class="form-control" id="add-username" name="username" placeholder="Username" required>
          </div>
          <div class="form-group">
			<label for="add-email">Email</label>
			<input type="email" class="form-control" id="add-email" name="email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <label for="add-first-name">First Name</label>
            <input type="text" class="form-control" id="add-first-name" name="first_name" placeholder="First Name" required>
          </div>
          <div class="form-group">
            <label for="add-last-name">Last Name</label>
            <input type="text" class="form-control" id="add-last-name" name="last_name" placeholder="Last Name" required>
          </div>
          <div class="form-group" id="add-training-level-container">
            <label for="add-training-level">Training Level</label>
            <select class="form-control" id="add-training-level" name="training_level">
				<option value="intern">Intern</option>
				<option value="ca-1">CA-1</option>
				<option value="ca-2">CA-2</option>
				<option value="ca-3">CA-3</option>
				<option value="fellow">Fellow</option>
			</select>
          </div>
		  <div class="form-group" id="add-secondary-training-level-container">
			<label for="add-secondary-training-level">Specialty</label>
			<input type="text" class="form-control" id="add-secondary-training-level" name="secondary_training_level" />
		  </div>
          <div class="form-group" id="add-photo-container">
			<label for="add-photo">Photo</label>
			<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
			<input type="file" accept="image/*" class="form-control" id="add-photo" name="photo" />
          </div>
          <div class="form-group">
            <label for="add-type">Account Type</label>
            <input type="text" class="form-control account-type" id="add-type" name="type" readonly>
          </div>
		  <div class="form-group" id="add-status-container">
			<label for="add-status">Account status</label>
			<select class="form-control" id="add-status" name="status">
				<option value="active">Active</option>
				<option value="inactive">Inactive</option>
				<option value="pending">Pending</option>
			</select>
		  </div>
		  <div class="form-group" id="new-account-email-container">
			  <label>
				  <input type="checkbox" id="new-account-email" name="send_email" value="true" checked>
				  Send welcome email
			  </label>
		  </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success">Create account</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Introduction Email Modal -->
<div class="modal fade" id="send-intro-email-modal" tabindex="-1" role="dialog" aria-labelledby="send-intro-email-modal-title" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
		  <form id="welcome-form" method="POST" action="/users/{id}/welcome" data-id="">
			<input type="hidden" name="_method" value="PATCH" />
			{{ csrf_field() }}
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="send-intro-email-modal-title">Send introduction email</h4>
			</div>
			<div class="modal-body">
				<p>
					This will resend the welcome email sent to all new user accounts.
				</p>
				<p>
					The email will contain the user's username and introductory information about basic usage of the system.
				</p>
				<p>
					Send the introduction email to <b id="send-intro-email-name"></b>?
				</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" id="send-intro-email-submit" class="btn btn-primary">Send introduction</button>
			</div>
		  </form>
		</div>
	</div>
</div>

<!-- Edit Password Modal -->
<div class="modal fade bs-edit-password-modal" tabindex="-1" role="dialog" aria-labelledby="modalEditPassword" aria-hidden="true" id="editPasswordModal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
	  <form id="password-form" method="POST" action="/users/{id}/password" data-id="">
	    <input type="hidden" name="_method" value="PATCH" />
		{{ csrf_field() }}
    	<div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        	<h4 class="modal-title" id="myModalEditPassword">Edit Password</h4>
    	</div>
	    <div class="modal-body modal-edit-password">
		  <p>
			Are you sure you want to reset <b id="edit-password-name"></b>'s password?
		  </p>
		  <p>
			The password will be reset and they will receive an email with a new one.
		  </p>
	    </div>
		  <div class="modal-footer modal-edit-password">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-warning">Reset password</button>
		  </div>
		</form>
    </div>
  </div>
</div>
@stop

@section("script")
	<script>
		$(".account-table").each(function(){
			var type = $(this).data("type");
			var data = {};

			if(type === "fellow"){
				data.type = "resident";
				data.training_level = "fellow";
			}
			else if(type === "resident"){
				data.type = "resident";
				data["training_level[]"] = ["intern", "ca-1", "ca-2", "ca-3"];
			}
			else
				data.type = type;

			var columns = [
				{data: "full_name"},
				{data: "username"},
				{data: "email"}
			];

			if(type === "resident")
				columns.push({data: "training_level", render: renderTrainingLevel});
			else if(type === "fellow")
				columns.push({data: "secondary_training_level", render: renderSecondaryTrainingLevel});

			columns.push({data: "status", render: renderAccountStatus});
			columns.push({data: null, orderable: false, searchable: false, render: function(user, type){
				if(!user)
					return "";

				var dataAttributes = getDataAttributes(user, ["profile_link"]);

				var editButton = '<button type="button" class="editUser btn btn-info btn-xs" '
					+ 'data-toggle="modal" data-target=".bs-edit-modal" '
					+ dataAttributes + '>'
					+ '<span class="glyphicon glyphicon-edit"></span> '
					+ 'Edit</button>';

				var sendIntroEmailButton = '<button type="button" class="send-intro-email-button btn btn-primary btn-xs" '
					+ 'data-toggle="modal" data-target="#send-intro-email-modal" '
					+ 'data-id="' + user.id + '" data-name="' + user.full_name + '">'
					+ '<span class="glyphicon glyphicon-send"></span> Introduction</button>';

				var passwordButton = '<button type="button" class="editPassword btn btn-warning btn-xs" '
					+ 'data-toggle="modal" data-target=".bs-edit-password-modal" '
					+ 'data-id="' + user.id + '" data-type="' + user.specific_type + '" '
					+ 'data-name="' + user.full_name + '"><span class="glyphicon glyphicon-send"></span> '
					+ 'Password</button>';

				var actionStatus, buttonType, buttonText, glyphType;
				switch(user.status){
					case "active":
						actionStatus = "inactive";
						buttonType = "btn-danger";
						buttonText = "Disable";
						glyphType = "glyphicon-remove";
						break;
					case "inactive":
					case "pending":
						actionStatus = "active";
						buttonType = "btn-success";
						buttonText = "Enable";
						glyphType = "glyphicon-ok";
						break;
				}

				var enableDisableContainer = '<span class="enable-disable-container">'
					+ '<button type="button" class="enable-disable-button btn ' + buttonType + ' btn-xs" '
					+ 'data-id="' + user.id + '" data-action-status="' + actionStatus + '">'
					+ '<span class="glyphicon ' + glyphType + '"></span> '
					+ buttonText + '</button></span>';

				var actionItems = [
					editButton
				];

				if (user.specific_type !== 'external') {
					actionItems.push(sendIntroEmailButton);
					actionItems.push(passwordButton);
					actionItems.push(enableDisableContainer);
				}

				return actionItems.join(' ');
			}});

			$(this).DataTable({
				ajax: {
					url: "/users",
					data: data,
					dataSrc: ""
				},
				columns: columns
			});
		});

		$(".jump-to-items a").click(function(event){
			event.preventDefault();
			var headerHeight = $("#main-navbar").height();
			var target = $(this).context.hash;
			var padding = 5;
			$(target).parents(".body-block").velocity("scroll", {offset: -(padding + headerHeight)});
		});

		$("#welcome-form").submit(function(event){
			event.preventDefault();
			var userId = $(this).data("id");
			var method = $(this).attr("method");
			var data = $(this).serialize();
			var button = $(this).find("button[type='submit']");
			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				url: "/users/" + userId + "/welcome",
				data: data,
				method: method
			}).done(function(response){
				if(response === "success")
					$("#send-intro-email-modal").modal("hide");
				else
					appendAlert(response, "#send-intro-email-modal .modal-body");
			}).fail(function(response){
				appendAlert("Error sending email.", "#send-intro-email-modal .modal-body");
			}).always(function(response){
				button.prop("disabled", false).removeClass("disabled");
			});

		});

		$("#password-form").on("submit", function(event){
			event.preventDefault();
			var type = $("#password-form-user-type").val();
			var method = $(this).attr("method");
			var userId = $(this).data("id");
			var data = $(this).serialize();
			var button = $(this).find("button[type='submit']");
			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				url: "/users/" + userId + "/password",
				data: data,
				method: method
			}).done(function(response){
				if(response === "success")
					$("#editPasswordModal").modal("hide");
				else
					appendAlert(response, "#editPasswordModal .modal-header");
			}).fail(function(response){
				appendAlert(response, "#editPasswordModal .modal-header");
			}).always(function(){
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#add-status").change(function(){
			if($(this).val() === "active")
				$("#new-account-email").prop("disabled", false).prop("checked", true)
					.parents(".form-group").velocity("slideDown");
			else
				$("#new-account-email").prop("checked", false).prop("disabled", true)
					.parents(".form-group").velocity("slideUp");
		});

		$("#add-form").on("submit", function(event){
			event.preventDefault();
			var modal = "#addModal";
			var type = $("#addModal .account-type").val();
			var method = $(this).attr("method");
			var table = "#manage-" + type + "-table";
			var button = $(this).find("button[type='submit']");
			button.prop("disabled", true).addClass("disabled");
			var formData = new FormData($(this)[0]);

			$.ajax({
				url: "/users",
				data: formData,
				method: method,
				processData: false,
				contentType: false
			}).done(function(response){
				button.prop("disabled", false).removeClass("disabled");
				if(response === "success"){
					$("#addModal").modal("hide");
					$("#manage-" + type + "-table").DataTable({
						retrieve: true
					}).ajax.reload();
				}
				else throw response;
			}).fail(function(response){
				button.prop("disabled", false).removeClass("disabled");
				appendAlert(response, modal + " .modal-body");
			});
		});

		$("#edit-form").on("submit", function(event){
			event.preventDefault();
			var modal = "#editModal";
			var method = $(this).attr("method");
			var type = $("#editModal .account-type").val();
			var table = "#manage-" + type + "-table";
			var userId = $(this).data("id");
			var button = $(this).find("button[type='submit']");
			button.prop("disabled", true).addClass("disabled");
			var formData = new FormData($(this)[0]);

			$.ajax({
				url: "/users/" + userId,
				data: formData,
				method: method,
				processData: false,
				contentType: false
			}).done(function(response){
				button.prop("disabled", false).removeClass("disabled");
				if(response === "success"){
					$("#editModal").modal("hide");
					$("#manage-" + type + "-table").DataTable({
						retrieve: true
					}).ajax.reload();
				}
				else throw response;
			}).fail(function(response){
				button.prop("disabled", false).removeClass("disabled");
				appendAlert(response, modal + " .modal-body");
			});
		});

		$(".account-table").on("click", ".enable-disable-button", function(){
			var userId = $(this).data("id");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.status = $(this).data("actionStatus");

			var actionStatus, buttonType, buttonText, glyphType;
			switch(data.status){
				case "active":
					actionStatus = "inactive";
					buttonType = "btn-danger";
					buttonText = "Disable";
					glyphType = "glyphicon-remove";
					break;
				case "inactive":
					actionStatus = "active";
					buttonType = "btn-success";
					buttonText = "Enable";
					glyphType = "glyphicon-ok";
					break;
			}

			var span = $(this).parent();
			var status = $(this).parent().parent().siblings().last();
			var tableContainer = $(this).parents(".row");
			$.ajax({
				url: "/users/" + userId,
				method: "POST",
				data: data,
			}).done(function(response){
				if(response === "success"){
					span.velocity("fadeOut", {display: "inline", complete: function(){
						$(this).html('<button type="button" class="enable-disable-button btn ' + buttonType + ' btn-xs" '
							+ 'data-id="' + userId + '" data-action-status="' + actionStatus + '">'
							+ '<span class="glyphicon ' + glyphType + '"></span> '
							+ buttonText + '</button>');
						$(this).velocity("fadeIn");
					}});
					status.velocity("fadeOut", {display: "table-cell", complete: function(){
						$(this).html(renderAccountStatus(data.status));
						$(this).velocity("fadeIn");
					}});
				}
				else throw response;
			}).fail(function(response){
				appendAlert()
			});
		});

		$(".account-table").on("click", ".editUser", function(){
			var id = $(this).data("id");
			var username = $(this).data("username");
			var email = $(this).data("email");
			var firstName = $(this).data("first_name");
			var lastName = $(this).data("last_name");
			var type = $(this).data("specific_type");
			var trainingLevel = $(this).data("training_level");
			var secondaryTrainingLevel = $(this).data("secondary_training_level");
			var photoPath = $(this).data("photo_path");

			$("#edit-form")[0].reset();
			$("#edit-username").val(username);
			$("#edit-email").val(email);
			$("#edit-first-name").val(firstName);
			$("#edit-last-name").val(lastName);
			$("#edit-form").data("id", id);
			$("#edit-type").val(type);
			if(!photoPath)
				$("#editModal #photo-preview").hide();
			else{
				$("#editModal #photo-preview").attr("src", "/"+photoPath);
				$("#editModal #photo-preview").show();
			}

			if(type === "resident"){
				$("#edit-training-level-container").show();
				$("#edit-training-level").val(trainingLevel);
			}
			else{
				$("#edit-training-level-container").hide();
			}

			if(type === "fellow") {
				$("#edit-training-level").val("fellow");
				$("#edit-secondary-training-level").val(secondaryTrainingLevel)
					.prop("disabled", false);
				$("#edit-secondary-training-level-container").show();
			} else {
				$("#edit-secondary-training-level").prop("disabled", true);
				$("#edit-secondary-training-level-container").hide();
			}

			if (type === 'external') {
				$('#edit-username').prop('required', false);
				$('#edit-username-container').hide();
				$('#edit-photo-container').hide();
			} else {
				$('#edit-username').prop('required', true);
				$('#edit-username-container').show();
				$('#edit-photo-container').show();
			}
		});

		$(".addUser").on("click", function(){
			var type = $(this).data('id');
			var trainingLevel;
			if(type === "resident")
				trainingLevel = $("#add-training-level").val();
			var status = $("#add-status").val();
			$("#add-form")[0].reset();
			$("#add-status").val(status);
			$("#add-type").val(type);
			if(type === "resident"){
				$("#add-training-level").val(trainingLevel).show();
			}
			else{
				$("#add-training-level-container").hide();
				$("#new-account-email").prop("checked", (type != "staff"));
			}

			if(type === "fellow") {
				$("#add-training-level").val("fellow");
				$("#add-secondary-training-level").val("")
					.prop("disabled", false);
				$("#add-secondary-training-level-container").show();
			}
			else {
				$("#add-secondary-training-level").prop("disabled", true);
				$("#add-secondary-training-level-container").hide();
			}

			if (type === 'external') {
				$('#add-username').prop('required', false);
				$('#add-username-container').hide();
				$('#add-photo-container').hide();
				$('#add-status-container').hide();
				$('#new-account-email-container').hide();
			} else {
				$('#add-username').prop('required', true);
				$('#add-username-container').show();
				$('#add-photo-container').show();
				$('#add-status-container').show();
				$('#new-account-email-container').show();
			}
		});

		$(".account-table").on("click", ".send-intro-email-button", function(){
			var id = $(this).data("id");
			var name = $(this).data("name");
			$("#welcome-form").data("id", id);
			$("#send-intro-email-name").text(name);
		});

		$(".account-table").on("click", ".editPassword", function(){
			var id = $(this).data("id");
			var name = $(this).data("name");
			$("#password-form").data("id", id);
			$("#edit-password-name").text(name);
		});
	</script>
@stop
