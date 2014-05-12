<?php
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$formId = $_POST["formId"];
	$success = "false";
	
	if($stmt = $mysqli->prepare("update forms set status='active' where formId=?;")){
		if($stmt->bind_param("s", $formId)){
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
	
	header("Location: manage_forms.php?success={$success}");
?>
