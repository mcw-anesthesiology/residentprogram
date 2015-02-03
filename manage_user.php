<?php
	//TODO: documentation

	session_start();
	require "init.php";
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php
			include "head.html";
		?>
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
				$emailPreferences = $mysqli->query("select reminderFrequency, evalNotifications from users where username='{$_SESSION["username"]}';")->fetch_assoc();
		?>
		<div class="container-fluid">
			<h3 class="sub-header">Email Notification Preferences</h3>
			<form id="email-form" action="email_preferences.php" method="post">
				<div class="form-group">
					<label for="reminderFrequency">How often do you want to receive reminder emails regarding evaluations?</label>
					<select id="reminderFrequency" name="reminderFrequency" class="form-control">
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="biweekly">Every two weeks</option>
					</select>
				</div>
				<div class="form-group">
					<label>Would you like to receive a notification every time a resident requests an evaluation?</label><br />
					<input id="yesNotifications" type="radio" name="evalNotifications" value="yes"> <label for="yesNotifications">Yes</label><br />
					<input id="noNotifications" type="radio" name="evalNotifications" value="no"> <label for="noNotifications">No</label><br /><br />
				</div>
				<button type="submit" class="btn btn-default">Update Email Preferences</button>
			</form>
		</div>
		<?php
			}
		?>
		<?php
			include "scripts.html";
		?>
		<script>
			$(document).ready(function(){
				<?php
					if(isset($emailPreferences)){
				?>
						$("option[value=<?= $emailPreferences["reminderFrequency"] ?>]").prop("selected", true);
						$("#<?= $emailPreferences["evalNotifications"] ?>Notifications").prop("checked", true);
				<?php
					}
				?>

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
