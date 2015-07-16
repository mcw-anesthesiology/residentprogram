@extends("app")

@section("body")
	<div class="row">
		<h2 class="sub-header">Residents  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="resident" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-resident">
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

	<div class="row">
		<h2 class="sub-header">Fellows  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="fellow" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-fellow">
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

	<div class="row">
		<h2 class="sub-header">Faculty  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="faculty" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-faculty">
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

	<div class="row">
		<h2 class="sub-header">Administrator  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="admin" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-admin">
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

	<!-- Disable Modal -->
<div class="modal fade bs-disable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalDisable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalDisable">Disable Account</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>disable</b> <span id="username"></span>. Would you like to continue?
      </div>
      <div class="modal-footer modal-disable">
		<form method="post" action="disable_account.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-danger" id="id" name="id">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Enable Modal -->
<div class="modal fade bs-enable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalEnable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalEnable">Enable Account</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>enable</b> <span id="username"></span>. Would you like to continue?
      </div>
      <div class="modal-footer modal-enable">
		<form method="post" action="enable_account.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-success" id="id" name="id">Confirm</button>
        </form>
      </div>
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
      <form enctype="multipart/form-data" method="post" action="edit_account.php">
        <div class="modal-body modal-edit">
          <div class="form-group">
            <label for="usernameInput">Username</label>
            <input type="text" class="form-control" id="usernameInput" name="username" readonly>
          </div>
          <div class="form-group">
			<label for="emailInput">Email</label>
			<input type="text" class="form-control" id="emailInput" name="email" required>
          </div>
          <div class="form-group">
            <label for="firstNameInput">First Name</label>
            <input type="text" class="form-control" id="firstNameInput" name="firstName" required>
          </div>
          <div class="form-group">
            <label for="lastNameInput">Last Name</label>
            <input type="text" class="form-control" id="lastNameInput" name="lastName" required>
          </div>
          <div class="form-group" id="trainingLevelDiv">
            <label for="trainingLevelInput">Training Level</label>
            <select class="form-control" id="trainingLevelInput" name="trainingLevel">
				<option value="intern">Intern</option>
				<option value="ca-1">CA-1</option>
				<option value="ca-2">CA-2</option>
				<option value="ca-3">CA-3</option>
				<option value="fellow">Fellow</option>
			</select>
          </div>
          <div class="form-group" id="photoDiv">
			<label for="photoInput">Photo</label>
			<input type="hidden" name="MAX_FILE_SIZE" value="500000" />
			<input type="file" accept="image/*" class="form-control" id="photoInput" name="photo" />
			<img id="photoPreview" src="" width="150px" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" value="">Save Changes</button>
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
      <form enctype="multipart/form-data" method="post" action="add_account.php">
        <div class="modal-body modal-add">
          <div class="form-group">
            <label for="usernameInput">Username</label>
            <input type="text" class="form-control" id="usernameInput" name="username" placeholder="Username" required>
          </div>
          <div class="form-group">
			<label for="emailInput">Email</label>
			<input type="text" class="form-control" id="emailInput" name="email" required>
          </div>
          <div class="form-group">
            <label for="passwordInput">Password</label>
            <input type="password" class="form-control" id="passwordInput" name="password" placeholder="Password" required>
          </div>
          <div class="form-group has-feedback" id="confirmPassword">
            <label for="passwordInput2">Re-Enter Password</label>
            <input type="password" class="form-control" id="passwordInput2" name="password2" placeholder="Re-Enter Password" required>
            <span class="glyphicon form-control-feedback" id="confirmIcon"></span>
          </div>
          <div class="form-group">
            <label for="firstNameInput">First Name</label>
            <input type="text" class="form-control" id="firstNameInput" name="firstName" placeholder="First Name" required>
          </div>
          <div class="form-group">
            <label for="lastNameInput">Last Name</label>
            <input type="text" class="form-control" id="lastNameInput" name="lastName" placeholder="Last Name" required>
          </div>
          <div class="form-group" id="trainingLevelDiv">
            <label for="trainingLevelInput">Training Level</label>
            <select class="form-control" id="trainingLevelInput" name="trainingLevel">
				<option value="intern">Intern</option>
				<option value="ca-1">CA-1</option>
				<option value="ca-2">CA-2</option>
				<option value="ca-3">CA-3</option>
				<option value="fellow">Fellow</option>
			</select>
          </div>
          <div class="form-group" id="photoDiv">
			<label for="photoInput">Photo</label>
			<input type="hidden" name="MAX_FILE_SIZE" value="500000" />
			<input type="file" accept="image/*" class="form-control" id="photoInput" name="photo" />
          </div>
          <div class="form-group">
            <label for="accountTypeInput">Account Type</label>
            <input type="text" class="form-control" id="accountTypeInput" name="accountType" readonly>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" value="">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Password Modal -->
<div class="modal fade bs-edit-password-modal" tabindex="-1" role="dialog" aria-labelledby="modalEditPassword" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalEditPassword">Edit Password</h4>
      </div>
      <div class="modal-body modal-edit-password">
        <form method="post" action="edit_password_admin.php">
			<div class="form-group">
				<label for="usernameInput">Username</label>
				<input type="text" class="form-control" id="username" name="username" placeholder="Username" required readonly>
			</div>
			<div class="form-group">
				<label for="password1">User Password</label>
				<input type="password" class="form-control" id="password1" name="newPassword" placeholder="New Password" required>
			</div>
			<div class="form-group">
				<label for="password2">Verify User Password</label>
				<input type="password" class="form-control" id="password2" name="newPassword2" placeholder="Verify New Password" required>
			</div>
			<div class="form-group">
				<label for="adminPassword">Verify Admin Password</label>
				<input type="password" class="form-control" id="adminPassword" name="adminPassword" placeholder="Verify Admin Password" required>
			</div>
		  </div>
		  <div class="modal-footer modal-edit-password">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-success">Confirm</button>
		  </div>
		</form>
    </div>
  </div>
</div>

<!-- Resident To Faculty Modal -->
<div class="modal fade bs-resident-to-faculty-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalResidentToFaculty" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalResidentToFaculty">Disable Account</h4>
      </div>
      <div class="modal-body modal-resident-to-faculty">
        <p>You have selected to convert the resident <b id="residentUsername"></b> to a faculty member.</p>
        <p><b>This cannot be undone.</b></p>
        <p>Would you like to continue?</p>
      </div>
      <div class="modal-footer modal-resident-to-faculty">
		<form method="post" action="resident_to_faculty.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-danger" id="username" name="username" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>


<!-- Add Error Modal -->
    <div class="modal fade bs-add-error-modal" tabindex="-1" role="dialog" aria-labelledby="modalError" aria-hidden="true" id="errorAddModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header alert alert-danger">
					<h3><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Account Error</h3>
				</div>
				<div class="modal-body">
					There was an error adding the account. Please try again.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
            </div>
        </div>
    </div>

<!-- Edit Error Modal -->
    <div class="modal fade bs-edit-error-modal" tabindex="-1" role="dialog" aria-labelledby="modalError" aria-hidden="true" id="errorEditModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header alert alert-danger">
					<h3><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Account Error</h3>
				</div>
				<div class="modal-body">
					There was an error editing the account. Please try again.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
            </div>
        </div>
	</div>


<!-- Password Error Modal -->
    <div class="modal fade bs-password-error-modal" tabindex="-1" role="dialog" aria-labelledby="modalError" aria-hidden="true" id="errorPasswordModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header alert alert-danger">
					<h3><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Account Error</h3>
				</div>
				<div class="modal-body">
					There was an error editing the password. Please try again.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
            </div>
        </div>
    </div>
@stop

@section("script")
	<script>

		$(document).on("click", ".disableUser", function(){
			var username = $(this).data('username');
			var id = $(this).data("id");
			$(".modal-disable #username").val(username);
			$(".modal-disable #id").val(id);
		});
		$(document).on("click", ".enableUser", function(){
			var username = $(this).data('username');
			var id = $(this).data("id");
			$(".modal-enable #username").val(username);
			$(".modal-enable #id").val(id);
		});

		$(".table").on("click", ".editUser", function(){
			var id = $(this).data("id");
			var username = $(this).data("username");
			var email = $(this).data("email");
			var firstName = $(this).data("first");
			var lastName = $(this).data("last");
			var trainingLevel = $(this).data("trainingLevel");
			var photoPath = $(this).data("photo");

			$(".modal-edit #usernameInput").val(username);
			$(".modal-edit #emailInput").val(email);
			$(".modal-edit #firstNameInput").val(firstName);
			$(".modal-edit #lastNameInput").val(lastName);
			if(trainingLevel !== ""){
				$(".modal-edit #trainingLevelDiv").show();
				$(".modal-edit #trainingLevelInput").val(currentTrainingLevel);
				$(".modal-edit #photoDiv").show();
				$(".modal-edit #photoPreview").attr("src", photoPath);
			}
			else{
				$(".modal-edit #trainingLevelDiv").hide();
				$(".modal-edit #photoDiv").hide();
				$(".modal-edit #photoPreview").attr("src", "");
			}
		});

		$(document).on("click", ".addUser", function(){
			var type = $(this).data('id');

			$(".modal-add #usernameInput").val("");
			$(".modal-add #emailInput").val("");
			$(".modal-add #passwordInput").val("");
			$(".modal-add #passwordInput2").val("");
			$(".modal-add #firstNameInput").val("");
			$(".modal-add #lastNameInput").val("");
			if(type == "resident"){
				$(".modal-add #trainingLevelDiv").show();
				$(".modal-add #photoDiv").show();
				$(".modal-add #accountTypeInput").val(type);
			}
			else if(type == "fellow"){
				$(".modal-add #trainingLevelInput").val("fellow");
				$(".modal-add #trainingLevelInput").attr("readonly");
				$(".modal-add #photoDiv").show();
				$(".modal-add #accountTypeInput").val("resident");
			}
			else{
				$(".modal-add #trainingLevelDiv").hide();
				$(".modal-add #photoDiv").hide();
				$(".modal-add #accountTypeInput").val(type);
			}
		});

		$(".datatable-resident").DataTable({
			"ajax": "/manage/accounts/get/residents",
			stateSave: true,
			"dom": "lfprtip"
		});
		$(".datatable-fellow").DataTable({
			"ajax": "/manage/accounts/get/fellows",
			stateSave: true,
			"dom": "lfprtip"
		});
		$(".datatable-faculty").DataTable({
			"ajax": "/manage/accounts/get/faculty",
			stateSave: true,
			"dom": "lfprtip"
		});
		$(".datatable-admin").DataTable({
			"ajax": "/manage/accounts/get/admins",
			stateSave: true,
			"dom": "lfprtip"
		});
	</script>
@stop
