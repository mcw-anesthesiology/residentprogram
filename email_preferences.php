<?php
	//TODO: documentation
	
	session_start();
	require "init.php";
	
	$reminderFrequency = $_POST["reminderFrequency"];
	$evalNotifications = $_POST["evalNotifications"];
	
	$username = $_SESSION["username"];
	
	$success = "false";
	
	if($evalNotifications != "yes" && $evalNotifications != "no"){
		header("Location: manage_user.php?success=false");
	}
	
	if($reminderFrequency != "daily" && $reminderFrequency != "weekly" && $reminderFrequency != "biweekly"){
		header("Location: manage_user.php?success=false");
	}
	
	if($stmt = $mysqli->prepare("update users set evalNotifications=?, reminderFrequency=? where username=?;")){
		if($stmt->bind_param("sss", $evalNotifications, $reminderFrequency, $username)){
			if($stmt->execute()){
				$success = "true";
			}
			else{
				print $stmt->error;
			}
		}
		else{
			print $stmt->error;
		}
	}
	else{
		print $mysqli->error;
	}
	
	header("Location: manage_user.php?success={$success}");
?>
