<?php 
	session_start(); 
	require "init.php";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title><?php echo ucfirst($_SESSION["type"])." Dashboard"; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">

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
  if($_SESSION["type"] == "admin"){				// ************************************ ADMIN ***********************************************************************
	  $users = $mysqli->query("select * from users where type = 'resident';");
	  $user = $users->fetch_assoc();	  
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Residents  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
          <div class="table-responsive">
            <table class="table table-striped user-table">
              <thead>
                <tr>
                  <th>Username</th>
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
              <td id="FN"><?= $user["firstName"] ?></td>
              <td id="LN"><?= $user["lastName"] ?></td>
              <td id="CD"><?= $user["createdDate"] ?></td>
              <td id="ST"><?= $user["status"] ?></td>
<?php
if($user["status"] == "inactive"){
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="enableUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-enable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button></td>
<?php
}
else{
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="disableUser btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-disable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button></td>
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
    $users = $mysqli->query("select * from users where type = 'faculty';");
    $user = $users->fetch_assoc();   
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Faculty  <button class="addUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
          <div class="table-responsive">
            <table class="table table-striped user-table">
              <thead>
                <tr>
                  <th>Username</th>
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
              <td id="FN"><?= $user["firstName"] ?></td>
              <td id="LN"><?= $user["lastName"] ?></td>
              <td id="CD"><?= $user["createdDate"] ?></td>
              <td id="ST"><?= $user["status"] ?></td>
<?php
if($user["status"] == "inactive"){
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="enableUser btn btn-success btn-xs" data-toggle="modal" data-target=".bs-enable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button></td>
<?php
}
else{
?>
                <td><button class="editUser btn btn-info btn-xs" data-toggle="modal" data-target=".bs-edit-modal" data-id="<?= $user["username"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button> <button class="disableUser btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-disable-modal-sm" data-id="<?= $user["username"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button></td>
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
          <h4 class="modal-title" id="myModalDisable">Disable Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>disable</b> the selected evaluation. Would you like to continue?
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
          <h4 class="modal-title" id="myModalEnable">Enable Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>enable</b> the selected evaluation. Would you like to continue?
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
            <label for="firstNameInput">First Name</label>
            <input type="text" class="form-control" id="firstNameInput" name="firstName">
          </div>
          <div class="form-group">
            <label for="lastNameInput">Last Name</label>
            <input type="text" class="form-control" id="lastNameInput" name="lastName">
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
<div class="modal fade bs-add-modal" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalAdd">Add Account</h4>
      </div>
      <form method="post" action="add_account.php">
        <div class="modal-body">
          <div class="form-group">
            <label for="usernameInput">Username</label>
            <input type="text" class="form-control" id="usernameInput" name="username" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="passwordInput">Password</label>
            <input type="password" class="form-control" id="passwordInput" name="password" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="firstNameInput">First Name</label>
            <input type="text" class="form-control" id="firstNameInput" name="firstName" placeholder="First Name">
          </div>
          <div class="form-group">
            <label for="lastNameInput">Last Name</label>
            <input type="text" class="form-control" id="lastNameInput" name="lastName" placeholder="Last Name">
          </div>
          <div class="form-group">
            <label for="accountTypeInput">Account Type</label>
            <select class="form-control" id="accountTypeInput" name="accountType">
              <option disabled selected value="">Select an account type</option>
              <option value="resident">Resident</option>
              <option value="faculty">Faculty</option>
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

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script>
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
      var firstName = $(this).closest("tr").find("#FN").text();
      var lastName = $(this).closest("tr").find("#LN").text();

      $(".modal-edit #usernameInput").val(username);
      $(".modal-edit #firstNameInput").val(firstName);
      $(".modal-edit #lastNameInput").val(lastName);
    });
    </script>
  </body>
</html>
