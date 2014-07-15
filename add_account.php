<?php
	//This page adds a new account to the users table. It is called by manage_users.php and returns there afterward with a success GET attribute which is either "true" or "false".
	//TODO: Ensure that both password entries are the same before doing anything, no idea why this wasn't done yet. 
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$username = $_POST["username"];
	$email = $_POST["email"];
	$password = password_hash(htmlspecialchars($_POST["password"]), PASSWORD_DEFAULT);
	$password2 = password_hash(htmlspecialchars($_POST["password2"]), PASSWORD_DEFAULT);
	$firstName = $_POST["firstName"];
	$lastName = $_POST["lastName"];
	$accountType = $_POST["accountType"];
	$trainingLevel = $_POST["trainingLevel"];
	$evaluationDate = date("Y-m-d H:i:s");
	$status = "active";
	
	$success = "false";
	
	foreach ($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php?success=false");
	}
	
	if(filter_var($email, FILTER_VALIDATE_EMAIL)){
		header("Location: manage_accounts.php?success=false");
	}
	
	$photoPath = "";
	
	if($accountType == "resident" && $_FILES["photo"]["error"] === UPLOAD_ERR_OK){
		if($_FILES["photo"]["type"] == "image/jpg" || $_FILES["photo"]["type"] == "image/jpeg" || $_FILES["photo"]["type"] == "image/png"){
			$photoPath = "photos/".uniqid().".".pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION);
			move_uploaded_file($_FILES["photo"]["tmp_name"], $photoPath);
		}
	}
	
	//The only difference between the two following cases is the trainingLevel attribute, it's null if not a resident
	if($accountType == "resident"){
		if($stmt = $mysqli->prepare("insert into users (username, password, email, firstName, lastName, type, status, createdDate, trainingLevel, photo) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("ssssssssss", $username, $password, $email, $firstName, $lastName, $accountType, $status, $evaluationDate, $trainingLevel, $photoPath))
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
		if($stmt = $mysqli->prepare("insert into users (username, password, email, firstName, lastName, type, status, createdDate) values (?, ?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("ssssssss", $username, $password, $firstName, $email, $lastName, $accountType, $status, $evaluationDate))
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
