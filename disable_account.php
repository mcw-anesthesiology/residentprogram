<?php
	//This page disables a specified account. It is called by manage_accounts.php and returns there afterward with a success value ("true" or "false")
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$success = "false";
	
	$username = $_POST["username"];
	if($stmt = $mysqli->prepare("update users set status='inactive' where username=?")){
		if($stmt->bind_param("s", $username)){
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
	
	header("Location: manage_accounts.php?success={$success}");
?>
