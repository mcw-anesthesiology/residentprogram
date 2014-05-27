<?php 
	//This page requests a new evaluation for a specified faculty member to complete in regards to a specified resident. It is called by request.php
	//If requested by a faculty member, it brings the user to the the complete_specific page
	//for the newly created request. Otherwise, it returns the user to the dashboard with a success GET attribute ("true" or "false")

	session_start();
	require "init.php";
	
	
	$evaluationForm = htmlspecialchars($_POST["evaluationForm"]);
	
		
	if($_SESSION["type"] == "resident")
		$resident = htmlspecialchars($_SESSION["username"]);
	else
		$resident = htmlspecialchars($_POST["resident"]);
		
	if($_SESSION["type"] == "faculty")
		$faculty = htmlspecialchars($_SESSION["username"]);
	else
		$faculty = htmlspecialchars($_POST["faculty"]);
		
		
	 $ipaddress = "";
	 if ($_SERVER["HTTP_CLIENT_IP"])
		 $ipaddress = $_SERVER["HTTP_CLIENT_IP"];
	 else if($_SERVER["HTTP_X_FORWARDED_FOR"])
		 $ipaddress = $_SERVER["HTTP_X_FORWARDED_FOR"];
	 else if($_SERVER["HTTP_X_FORWARDED"])
		 $ipaddress = $_SERVER["HTTP_X_FORWARDED"];
	 else if($_SERVER["HTTP_FORWARDED_FOR"])
		 $ipaddress = $_SERVER["HTTP_FORWARDED_FOR"];
	 else if($_SERVER["HTTP_FORWARDED"])
		 $ipaddress = $_SERVER["HTTP_FORWARDED"];
	 else if($_SERVER["REMOTE_ADDR"])
		 $ipaddress = $_SERVER["REMOTE_ADDR"];
	 else
		 $ipaddress = "UNKNOWN";
		 
	$success = "false";
		 
	$requestDate = date("Y-m-d H:i:s");
	$status = "pending";
	
	if($stmt = $mysqli->prepare("insert into `requests` (formId, resident, faculty, requestedBy, status, requestDate, ipAddress) values (?, ?, ?, ?, ?, ?, ?);"))
		if($stmt->bind_param("issssss", $evaluationForm, $resident, $faculty, $_SESSION["username"], $status, $requestDate, $ipaddress))
			if($stmt->execute())
				$success = "true";
				
	$requestId = $stmt->insert_id;
	
	if($_SESSION["type"] == "faculty"){
		header("Location: complete_specific.php?request={$requestId}");
	}
	else
		header("Location: dashboard.php?success={$success}");

?>
