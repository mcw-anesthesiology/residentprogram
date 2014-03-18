<?php
	session_start();
	require "init.php";
	
	$requestId = $_POST["requestId"];
	$mysqli->query("update requests set status='disabled' where requestId='{$requestId}'");
	header("Location: manage_evaluations.php");
?>
