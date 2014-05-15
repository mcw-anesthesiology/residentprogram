<?php
	//This page cancels a request by a faculty member. Called from dashboard_faculty.php, returns to dashboard.php (dashboard_faculty.php) afterward. 
	session_start();
	require "init.php";
	
	$requestId = $_POST["requestId"];
	$mysqli->query("update requests set status='canceled by faculty' where requestId='{$requestId}'");
	header("Location: dashboard.php");
?>
