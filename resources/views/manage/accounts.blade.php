@extends("app")

@section("body")
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
		<div class="table-responsive">
			<table class="table table-striped datatable-resident" width="100%">
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
		<div class="table-responsive">
			<table class="table table-striped datatable-fellow" width="100%">
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
		<h2 class="sub-header" id="faculty-heading">Faculty  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="faculty" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-faculty" width="100%">
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
		<div class="table-responsive">
			<table class="table table-striped datatable-staff" width="100%">
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
			<table class="table table-striped datatable-admin" width="100%">
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

<!-- Edit Modal -->
<div class="modal fade bs-edit-modal" tabindex="-1" role="dialog" aria-labelledby="modalEdit" aria-hidden="true" id="editModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalEdit">Edit Account</h4>
      </div>
      <form id="edit-form" enctype="multipart/form-data" method="post" action="/manage/accounts/edit">
		  {!! csrf_field() !!}
		<input type="hidden"  id="id" name="id" value="" />
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
			<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
			<input type="file" accept="image/*" class="form-control" id="photoInput" name="photo" />
			<div  style="text-align: center;">
				<img id="photoPreview" src="" width="150px" />
			</div>
          </div>
		  <div class="form-group">
            <label for="accountTypeInput">Account Type</label>
            <input type="text" class="form-control" id="accountTypeInput" readonly>
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
      <form id="add-form" enctype="multipart/form-data" method="post" action="/manage/accounts/add">
		  {!! csrf_field() !!}
        <div class="modal-body modal-add">
          <div class="form-group">
            <label for="usernameInput">Username</label>
            <input type="text" class="form-control" id="usernameInput" name="username" placeholder="Username" required>
          </div>
          <div class="form-group">
			<label for="emailInput">Email</label>
			<input type="text" class="form-control" id="emailInput" name="email" placeholder="Email" required>
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
			<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
			<input type="file" accept="image/*" class="form-control" id="photoInput" name="photo" />
          </div>
          <div class="form-group">
            <label for="accountTypeInput">Account Type</label>
            <input type="text" class="form-control" id="accountTypeInput" name="accountType" readonly>
          </div>
		  <div class="form-group">
			  <label>
				  <input type="checkbox" id="new-account-email" name="send_email" value="true" checked>
				  Send welcome email
			  </label>
		  </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Create account</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Password Modal -->
<div class="modal fade bs-edit-password-modal" tabindex="-1" role="dialog" aria-labelledby="modalEditPassword" aria-hidden="true" id="editPasswordModal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalEditPassword">Edit Password</h4>
      </div>
        <form id="password-form" method="post" action="/manage/accounts/password">
    	  <div class="modal-body modal-edit-password">
			{!! csrf_field() !!}
			<input type="hidden" id="edit-password-id" name="id" />
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

<!-- Resident To Faculty Modal -->
<div class="modal fade bs-resident-to-faculty-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalResidentToFaculty" aria-hidden="true" id="residentToFacultyModal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalResidentToFaculty">Disable Account</h4>
      </div>
      <div class="modal-body modal-resident-to-faculty">
        <p>You have selected to convert the resident or fellow <b id="name"></b> to a faculty member.</p>
        <p><b>This cannot be undone.</b></p>
        <p>Would you like to continue?</p>
      </div>
      <div class="modal-footer modal-resident-to-faculty">
		<form method="post" action="/manage/accounts/to-faculty">
			{!! csrf_field() !!}
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-warning" id="id" name="id" value="">Move to faculty</button>
        </form>
      </div>
    </div>
  </div>
</div>
@stop

@section("script")
	<script>
		$(".jump-to-items a").click(function(event){
			event.preventDefault();
			var headerHeight = $("#main-navbar").height();
			var target = $(this).context.hash;
			var padding = 5;
			var scrollto = $(target).parents(".body-block").offset().top - padding - headerHeight;
			$("html, body").animate({scrollTop: scrollto});
		});

		$("#password-form").on("submit", function(event){
			event.preventDefault();
			var type = $("#password-form-user-type").val();
			var data = $(this).serialize() + "&ajax=true";
			$.post($(this).prop("action"), data, function(response){
				if(response == "true"){
					$("#editPasswordModal").modal("hide");
				}
				else{
					appendAlert(response, "#editPasswordModal .modal-body");
				}
			});
		});

		$("#add-form").on("submit", function(event){
			event.preventDefault();
			submitAddEditForm("#addModal", $(this));
		});

		$("#edit-form").on("submit", function(event){
			event.preventDefault();
			submitAddEditForm("#editModal", $(this));
		})

		function submitAddEditForm(modal, form){
			var type = $(modal + " #accountTypeInput").val();
			var fd = new FormData(form.get(0));
			fd.append("ajax", true);
			$.ajax({
				url: form.prop("action"),
				data: fd,
				processData: false,
				contentType: false,
				type: "POST",
				success: function(response){
					if(response == "true"){
						$(modal).modal("hide");
						$(".datatable-" + type).DataTable({
							retrieve: true
						}).ajax.reload();
					}
					else{
						appendAlert(response, modal + " .modal-body");
					}
				}
			});
		}

		$(".table").on("click", ".disableUser", function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = $(this).data("id");
			var span = $(this).parent();
			var status = $(this).parent().parent().siblings().last();
			$.ajax({
				"method": "post",
				"url": "/manage/accounts/disable",
				"data": data,
				"success": function(response){
					span.fadeOut(function(){
						$(this).html("<button class='enableUser btn btn-success btn-xs' data-id='"+data.id+"'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
						$(this).fadeIn();
					});
					status.fadeOut(function(){
						$(this).html("inactive");
						$(this).fadeIn();
					});
				}
			});
		});
		$(".table").on("click", ".enableUser", function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = $(this).data("id");
			var span = $(this).parent();
			var status = $(this).parent().parent().siblings().last();
			$.ajax({
				"method": "post",
				"url": "/manage/accounts/enable",
				"data": data,
				"success": function(response){
					span.fadeOut(function(){
						$(this).html("<button class='disableUser btn btn-danger btn-xs' data-id='"+data.id+"'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
						$(this).fadeIn();
					});
					status.fadeOut(function(){
						$(this).html("active");
						$(this).fadeIn();
					});
				}
			});
		});

		$(".table").on("click", ".editUser", function(){
			var id = $(this).data("id");
			var username = $(this).data("username");
			var email = $(this).data("email");
			var firstName = $(this).data("first");
			var lastName = $(this).data("last");
			var type = $(this).data("type");
			var trainingLevel = $(this).data("traininglevel");
			var photoPath = $(this).data("photo");

			$("#edit-form")[0].reset();
			$("#editModal #usernameInput").val(username);
			$("#editModal #emailInput").val(email);
			$("#editModal #firstNameInput").val(firstName);
			$("#editModal #lastNameInput").val(lastName);
			$("#editModal #id").val(id);
			$("#editModal #accountTypeInput").val(type);
			if(photoPath == "")
				$("#editModal #photoPreview").hide();
			else{
				$("#editModal #photoPreview").attr("src", "/"+photoPath);
				$("#editModal #photoPreview").show();
			}
			if(type == "resident"){
				$("#editModal #trainingLevelDiv").show();
				$("#editModal #trainingLevelInput").val(trainingLevel);
			}
			else{
				if(type == "fellow")
					$("#editModal #trainingLevelInput").val("fellow");
				$("#editModal #trainingLevelDiv").hide();
			}
		});

		$(".addUser").on("click", function(){
			var type = $(this).data('id');
			$("#add-form")[0].reset();
			$("#addModal #accountTypeInput").val(type);
			if(type == "resident"){
				$("#addModal #trainingLevelDiv").show();
			}
			else{
				if(type == "fellow")
					$("#addModal #trainingLevelInput").val("fellow");
				$("#addModal #trainingLevelDiv").hide();
				$("#new-account-email").prop("checked", (type != "staff"));
			}
		});

		$(".table").on("click", ".residentToFaculty", function(){
			var id = $(this).data("id");
			var name = $(this).data("name");

			$("#residentToFacultyModal #name").html(name);
			$("#residentToFacultyModal #id").val(id);
		});

		$(".table").on("click", ".editPassword", function(){
			var id = $(this).data("id");
			var name = $(this).data("name");
			$("#editPasswordModal .form-control").val("");
			$("#edit-password-id").val(id);
			$("#edit-password-name").text(name);
		});

		$("#passwordInput2").keyup(function(){
			var password1 = $("#passwordInput").val();
			var password2 = $("#passwordInput2").val();
			if(password1 == password2){
				$("#confirmPassword").attr("class","form-group has-success has-feedback");
				$("#confirmIcon").attr("class","glyphicon glyphicon-ok form-control-feedback");
			}
			else{
				$("#confirmPassword").attr("class","form-group has-error has-feedback");
				$("#confirmIcon").attr("class","glyphicon glyphicon-remove form-control-feedback");
			}
		});

		$(".datatable-resident").DataTable({
			"ajax": "/manage/accounts/get/resident"
		});
		$(".datatable-fellow").DataTable({
			"ajax": "/manage/accounts/get/fellow"
		});
		$(".datatable-faculty").DataTable({
			"ajax": "/manage/accounts/get/faculty"
		});
		$(".datatable-staff").DataTable({
			"ajax": "/manage/accounts/get/staff"
		})
		$(".datatable-admin").DataTable({
			"ajax": "/manage/accounts/get/admin"
		});
	</script>
@stop