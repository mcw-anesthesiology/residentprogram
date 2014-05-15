<?php
	//This page cancels a request by a resident. Called from dashboard_resident.php, returns to dashboard.php (dashboard_resident.php) afterward. 
	session_start();
	require "init.php";
	
	$requestId = $_POST["requestId"];
	$mysqli->query("update requests set status='canceled by resident' where requestId='{$requestId}'");
	header("Location: dashboard.php");
?>
