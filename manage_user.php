<?php
	//TODO: documentation
	
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
		<div class="container-fluid">
			<form role="form" id="password-form" action="edit_password.php" method="post">
				<div class="form-group">
					<h3 class="sub-header">Update Password</h3>
					<div class="form-group">
						<label for="oldPassword">Old Password</label>
						<input class="form-control" name="oldPassword" id="oldPassword" type="password" placeholder="Current Password" required /><br />
					</div>
					<div class="form-group">
						<label for="newPassword">New Password</label>
						<input class="form-control" name="newPassword" id="newPassword" type="password" placeholder="New Password" required /><br />
					</div>
					<div class="form-group">
						<label for="newPassword2">Confirm New Password  <span class="glyphicon form-control-feedback" id="confirmIcon"></span></label>
						<input class="form-control" name="newPassword2" id="newPassword2" type="password" placeholder="Confirm New Password" required />
					</div>
					<button type="submit" class="btn btn-default">Update Password</button>
				</div>
			</form>
		</div>
		<?php
			if($_SESSION["type"] === "faculty"){
		?>
		<div class="container-fluid">
			<h3 class="sub-header">Email Notification Preferences</h3>
			<form id="email-form" action="email_preferences.php" method="post">
				<div class="form-group">
					<label for="reminder-frequency">How often do you want to receive reminder emails regarding evaluations?</label>
					<select id="reminder-frequency" class="form-control">
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="biweekly">Every two weeks</option>
					</select>
				</div>
				<div class="form-group">
					<label>Would you like to receive a notification every time a resident requests an evaluation?</label><br />
					<input id="yesNotification" type="radio" name="evalNotification" value="yes"> <label for="yesNotification">Yes</label><br />
					<input id="noNotification" type="radio" name="evalNotification" value="no"> <label for="noNotification">No</label><br /><br />
				</div>
				<button type="submit" class="btn btn-default">Update Email Preferences</button>
			</form>
		</div>
		<?php
			}
		?>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="../../assets/js/docs.min.js"></script>
		<script>
			$(document).ready(function(){
				$("#newPassword2").keyup(function(){
					var password1 = $("#newPassword").val();
					var password2 = $("#newPassword2").val();
					if(password1 == password2){
					  //$("#confirmPassword").attr("class","form-group has-success has-feedback");
					  $("#confirmIcon").attr("class","glyphicon glyphicon-ok form-control-feedback");
					}
					else{
					  //$("#confirmPassword").attr("class","form-group has-error has-feedback");
					  $("#confirmIcon").attr("class","glyphicon glyphicon-remove form-control-feedback");
					}
				});
			});
		</script>
	</body>
</html>
