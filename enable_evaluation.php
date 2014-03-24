<?php
	session_start();
	require "init.php";
	
	$requestId = $_POST["requestId"];
	
	$resultComplete = $mysqli->query("select completeDate from requests where requestId='{$requestId}'");
	$row = $resultComplete->fetch_assoc();

	if(is_null($row["completeDate"])){
		$status = "pending";
	}
	else{
		$status = "complete";
	}

	$mysqli->query("update requests set status='{$status}' where requestId='{$requestId}'");
	header("Location: manage_evaluations.php");
?>
