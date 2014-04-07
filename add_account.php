<?php
	session_start();
	require "init.php";
	
	$username = $mysqli->escape_string($_POST["username"]);
	$password = md5(htmlspecialchars($_POST["password"]));
	$password2 = md5(htmlspecialchars($_POST["password2"]));
	$firstName = $mysqli->escape_string($_POST["firstName"]);
	$lastName = $mysqli->escape_string($_POST["lastName"]);
	$accountType = $mysqli->escape_string($_POST["accountType"]);
	$trainingLevel = $mysqli->escape_string($_POST["trainingLevel"]);
	$evaluationDate = date("Y-m-d H:i:s");
	$status = "active";
	
	foreach ($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php");
	}
	
	if($accountType == "resident"){
		if($stmt = $mysqli->prepare("insert into users (username, password, firstName, lastName, type, status, createdDate, trainingLevel) values (?, ?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("ssssssss", $username, $password, $firstName, $lastName, $accountType, $status, $evaluationDate, $trainingLevel))
				$stmt->execute();
			else echo $mysqli->errno;
		}
		else echo $mysqli->errno;
	}
	else{
		if($stmt = $mysqli->prepare("insert into users (username, password, firstName, lastName, type, status, createdDate) values (?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("sssssss", $username, $password, $firstName, $lastName, $accountType, $status, $evaluationDate))
				$stmt->execute();
			else echo $mysqli->errno;
		}
		else echo $mysqli->errno;
	}
	
	header("Location: manage_accounts.php");
?>
