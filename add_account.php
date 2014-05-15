<?php
	//This page adds a new account to the users table. It is called by manage_users.php and returns there afterward with a success GET attribute which is either "true" or "false".
	//TODO: Ensure that both password entries are the same before doing anything, no idea why this wasn't done yet. 
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$username = $mysqli->escape_string($_POST["username"]);
	$password = password_hash(htmlspecialchars($_POST["password"]), PASSWORD_DEFAULT);
	$password2 = password_hash(htmlspecialchars($_POST["password2"]), PASSWORD_DEFAULT);
	$firstName = $mysqli->escape_string($_POST["firstName"]);
	$lastName = $mysqli->escape_string($_POST["lastName"]);
	$accountType = $mysqli->escape_string($_POST["accountType"]);
	$trainingLevel = $mysqli->escape_string($_POST["trainingLevel"]);
	$evaluationDate = date("Y-m-d H:i:s");
	$status = "active";
	
	$success = "false";
	
	foreach ($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php?success=false");
	}
	
	//The only difference between the two following cases is the trainingLevel attribute, it's null if not a resident
	if($accountType == "resident"){
		if($stmt = $mysqli->prepare("insert into users (username, password, firstName, lastName, type, status, createdDate, trainingLevel) values (?, ?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("ssssssss", $username, $password, $firstName, $lastName, $accountType, $status, $evaluationDate, $trainingLevel))
				if($stmt->execute()){
					$success = "true";
				}
				else{
					print $stmt->error;
				}
			else{
				print $stmt->error;
			}
		}
		else{
			print $mysqli->error;
		}
	}
	else{
		if($stmt = $mysqli->prepare("insert into users (username, password, firstName, lastName, type, status, createdDate) values (?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("sssssss", $username, $password, $firstName, $lastName, $accountType, $status, $evaluationDate))
				if($stmt->execute()){
					$success = "true";
				}
				else{
					print $stmt->error;
				}
			else{
				print $stmt->error;
			}
		}
		else{
			print $mysqli->error;
		}
	}
	
	header("Location: manage_accounts.php?success={$success}");
?>
