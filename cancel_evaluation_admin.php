<?php
	//This page disables a specified evaluation. It is called by manage_evaluations.php and returns there afterward with a success value ("true" or "false")
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	$requestId = $_POST["requestId"];
	
	$request = $mysqli->query("select status from requests where requestId='{$requestId}'")->fetch_assoc();
	if($request["status"] !== "pending"){
		header("Location: manage_evaluations.php?success=false");
	}
	
	$success = "false";
	
	
	if($stmt = $mysqli->prepare("update requests set status='canceled by admin' where requestId=?")){
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
