<?php
	//This page disables a specified evaluation form. It is called by manage_forms.php and returns there afterward with a success value ("true" or "false")
	session_start();
	require "init.php";

	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}

	$success = "false";

	$formId = $_POST["formId"];
	if($stmt = $mysqli->prepare("update forms set status='inactive' where formId=?;")){
		if($stmt->bind_param("s", $formId)){
			if($stmt->execute()){
				$success = "true";
			}
			else{

			}
		}
		else{

		}
	}
	else{

	}

	echo $success;
?>
