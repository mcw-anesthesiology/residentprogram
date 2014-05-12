<?php
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$username = $mysqli->escape_string($_POST["username"]);
	$firstName = $mysqli->escape_string($_POST["firstName"]);
	$lastName = $mysqli->escape_string($_POST["lastName"]);
	$trainingLevel = $mysqli->escape_string($_POST["trainingLevel"]);
	$modifiedDate = date("Y-m-d H:i:s");
	
	$success = "false";
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php");
	}

	if($stmt = $mysqli->prepare("update users set firstName=?, lastName=?, trainingLevel=?, modifiedDate=? where username=?;")){
		if($stmt->bind_param("sssss", $firstName, $lastName, $trainingLevel, $modifiedDate, $username)){
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
