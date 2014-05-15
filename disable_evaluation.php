<?php
	//This page disables a specified evaluation. It is called by manage_evaluations.php and returns there afterward with a success value ("true" or "false")
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	$success = "false";
	
	$requestId = $_POST["requestId"];
	if($stmt = $mysqli->prepare("update requests set status='disabled' where requestId=?")){
		if($stmt->bind_param("s", $requestId)){
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
	
	header("Location: manage_evaluations.php?success={$success}");
?>
