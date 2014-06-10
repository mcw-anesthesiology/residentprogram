<?php
	//This page edits a specified user with the values it receives from the edit user modal that calls it on manage_accounts.php, where it returns afterwards with a success value ("true" or "false")
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$username = $mysqli->escape_string($_POST["username"]);
	$email = $_POST["email"];
	$firstName = $mysqli->escape_string($_POST["firstName"]);
	$lastName = $mysqli->escape_string($_POST["lastName"]);
	$trainingLevel = $mysqli->escape_string($_POST["trainingLevel"]);
	$modifiedDate = date("Y-m-d H:i:s");
	
	$success = "false";
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php");
	}
	
	if(filter_var($email, FILTER_VALIDATE_EMAIL)){
		header("Location: manage_accounts.php?success=false");
	}

	if($stmt = $mysqli->prepare("update users set email=?, firstName=?, lastName=?, trainingLevel=?, modifiedDate=? where username=?;")){
		if($stmt->bind_param("ssssss", $email, $firstName, $lastName, $trainingLevel, $modifiedDate, $username)){
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
