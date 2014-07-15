<?php
	//This page edits a specified user with the values it receives from the edit user modal that calls it on manage_accounts.php, where it returns afterwards with a success value ("true" or "false")
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$username = $_POST["username"];
	$email = $_POST["email"];
	$firstName = $_POST["firstName"];
	$lastName = $_POST["lastName"];
	$trainingLevel = $_POST["trainingLevel"];
	$modifiedDate = date("Y-m-d H:i:s");
	
	$success = "false";
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php");
	}
	
	if(filter_var($email, FILTER_VALIDATE_EMAIL)){
		header("Location: manage_accounts.php?success=false");
	}
	
	$photoPath = "";
	
	if($_FILES["photo"]["error"] === UPLOAD_ERR_OK){
		if($_FILES["photo"]["type"] == "image/jpg" || $_FILES["photo"]["type"] == "image/jpeg" || $_FILES["photo"]["type"] == "image/png"){
			$photoPath = "photos/".uniqid().".".pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION);
			move_uploaded_file($_FILES["photo"]["tmp_name"], $photoPath);
		}
	}

	if($stmt = $mysqli->prepare("update users set email=?, firstName=?, lastName=?, trainingLevel=?, modifiedDate=?, photo=? where username=?;")){
		if($stmt->bind_param("sssssss", $email, $firstName, $lastName, $trainingLevel, $modifiedDate, $photoPath, $username)){
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
