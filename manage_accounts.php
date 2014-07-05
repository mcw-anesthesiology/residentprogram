<?php 
	//This page is is used to add/edit/disable users. It displays three tables, one for each user type. Each row contains the account information for a user, as well as edit and enable/disable buttons.
	
	//TODO: reset password functionality
	session_start(); 
	require "init.php";
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="favicon.ico">

    <title><?php echo ucfirst($_SESSION["type"])." Dashboard"; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">
    <link href="http://cdn.datatables.net/1.10.0/css/jquery.dataTables.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

<?php require 'header.php'; ?>

<?php 
  if($_SESSION["type"] == "admin"){				// ************************************ RESIDENT ***********************************************************************
	  $users = $mysqli->query("select * from users where type = 'resident';");
	  $user = $users->fetch_assoc();	  
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Residents  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="resident" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
          <div class="table-responsive">
            <table class="table table-striped user-table datatable">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Training Level</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
				  <?php
					while(!is_null($user)){
				  ?>
						<tr>
              <td id="UN"><?= $user["username"] ?></td>
              <td id="EM"><?= $user["email"] ?></td>
              <td id="FN"><?= $user["firstName"] ?></td>
              <td id="LN"><?= $user["lastName"] ?></td>
              <td id="TL"><?= strtoupper($user["trainingLevel"]) ?></td>
              <td id="CD"><?= $user["createdDate"] ?></td>
              <td id="ST"><?= $user["status"] ?></td>
<?php
if($user["status"] == "inactive"){
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="editPassword btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-password-modal" data-id="<?= $user["username"] ?>" id="editPasswordBtn"><span class="glyphicon glyphicon-edit"></span> Edit Password</button> <button class="enableUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-enable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button></td>
<?php
}
else{
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="editPassword btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-password-modal" data-id="<?= $user["username"] ?>" id="editPasswordBtn"><span class="glyphicon glyphicon-edit"></span> Edit Password</button> <button class="disableUser btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-disable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button></td>
<?php
}
?>
            </tr>            
<?php
$user = $users->fetch_assoc();
}
?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php 
    $users = $mysqli->query("select * from users where type = 'faculty';"); // ************************************ FACULTY ***********************************************************************
    $user = $users->fetch_assoc();   
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Faculty  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="faculty" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
          <div class="table-responsive">
            <table class="table table-striped user-table datatable">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
          <?php
          while(!is_null($user)){
          ?>
            <tr>
              <td id="UN"><?= $user["username"] ?></td>
              <td id="EM"><?= $user["email"] ?></td>
              <td id="FN"><?= $user["firstName"] ?></td>
              <td id="LN"><?= $user["lastName"] ?></td>
              <td id="CD"><?= $user["createdDate"] ?></td>
              <td id="ST"><?= $user["status"] ?></td>
<?php
if($user["status"] == "inactive"){
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="editPassword btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-password-modal" data-id="<?= $user["username"] ?>" id="editPasswordBtn"><span class="glyphicon glyphicon-edit"></span> Edit Password</button> <button class="enableUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-enable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button></td>
<?php
}
else{
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="editPassword btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-password-modal" data-id="<?= $user["username"] ?>" id="editPasswordBtn"><span class="glyphicon glyphicon-edit"></span> Edit Password</button> <button class="disableUser btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-disable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button></td>
<?php
}
?>
            </tr>            
<?php
$user = $users->fetch_assoc();
}
?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

<?php 
    $users = $mysqli->query("select * from users where type = 'admin';"); // ************************************ ADMIN ***********************************************************************
    $user = $users->fetch_assoc();   
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Administrator  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="admin" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
          <div class="table-responsive">
            <table class="table table-striped user-table datatable">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
          <?php
          while(!is_null($user)){
          ?>
            <tr>
              <td id="UN"><?= $user["username"] ?></td>
              <td id="EM"><?= $user["email"] ?></td>
              <td id="FN"><?= $user["firstName"] ?></td>
              <td id="LN"><?= $user["lastName"] ?></td>
              <td id="CD"><?= $user["createdDate"] ?></td>
              <td id="ST"><?= $user["status"] ?></td>
<?php
if($user["status"] == "inactive"){
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="editPassword btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-password-modal" data-id="<?= $user["username"] ?>" id="editPasswordBtn"><span class="glyphicon glyphicon-edit"></span> Edit Password</button> <button class="enableUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-enable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button></td>
<?php
}
else{
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="editPassword btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-password-modal" data-id="<?= $user["username"] ?>" id="editPasswordBtn"><span class="glyphicon glyphicon-edit"></span> Edit Password</button> <button class="disableUser btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-disable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button></td>
<?php
}
?>
            </tr>            
<?php
$user = $users->fetch_assoc();
}
?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php 
  }
?>

<!-- Disable Modal -->
<div class="modal fade bs-disable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalDisable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalDisable">Disable Account</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>disable</b> the selected account. Would you like to continue?
      </div>
      <div class="modal-footer modal-disable">
		<form method="post" action="disable_account.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-danger" id="username" name="username" value="">Confirm</button>
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
        You have selected to <b>enable</b> the selected account. Would you like to continue?
      </div>
      <div class="modal-footer modal-enable">
		<form method="post" action="enable_account.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-success" id="username" name="username" value="">Confirm</button>
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
      <form method="post" action="edit_account.php">
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
			</select>
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
      <form method="post" action="add_account.php">
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
			</select>
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
		  <div class="modal-footer modal-enable">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-success">Confirm</button>
		  </div>
		</form>
    </div>
  </div>
</div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script type="text/javascript" src="http://cdn.datatables.net/1.10.0/js/jquery.dataTables.js"></script>
    <script>
		$(document).ready(function(){
		  $(".datatable").each(function(){
			$(this).dataTable(); 
		  });
		});	
		
		$(document).on("click", ".disableUser", function(){
			var username = $(this).data('id');
			$(".modal-disable #username").val(username);
		});
		
		$(document).on("click", ".enableUser", function(){
			var username = $(this).data('id');
			$(".modal-enable #username").val(username);
		});

    $(".user-table").on('click', '#editBtn', function (){
      var username = $(this).closest("tr").find("#UN").text();
      var email = $(this).closest("tr").find("#EM").text();
      var firstName = $(this).closest("tr").find("#FN").text();
      var lastName = $(this).closest("tr").find("#LN").text();
      var currentTrainingLevel = $(this).closest("tr").find("#TL").text();
      
      $(".modal-edit #usernameInput").val(username);
      $(".modal-edit #emailInput").val(email);
      $(".modal-edit #firstNameInput").val(firstName);
      $(".modal-edit #lastNameInput").val(lastName);
      if($(this).closest("tr").find("#TL").text() !== ""){
		  $(".modal-edit #trainingLevelDiv").show();
		  $(".modal-edit #trainingLevelInput").val(currentTrainingLevel);
	  }
	  else{
		  $(".modal-edit #trainingLevelDiv").hide();
	  }
    });
    
    $(".user-table").on("click", "#editPasswordBtn", function(){
		var username = $(this).data("id");
		$(".modal-edit-password #username").val(username);
	});

    $(document).on("click", ".addUser", function(){
      var type = $(this).data('id');

      $(".modal-add #usernameInput").val("");
      $(".modal-add #emailInput").val("");
      $(".modal-add #passwordInput").val("");
      $(".modal-add #passwordInput2").val("");
      $(".modal-add #firstNameInput").val("");
      $(".modal-add #lastNameInput").val("");
      $(".modal-add #accountTypeInput").val(type);
      if(type == "resident"){
		  $(".modal-add #trainingLevelDiv").show();
	  }
	  else{
		  $(".modal-add #trainingLevelDiv").hide();
	  }
    });

    $(document).ready(function(){
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
    });
    </script>
  </body>
</html>
