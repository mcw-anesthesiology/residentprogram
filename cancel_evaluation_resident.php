<?php
	session_start();
	require "init.php";
	
	$requestId = $_POST["requestId"];
	$mysqli->query("update requests set status='canceled by resident' where requestId='{$requestId}'");
	header("Location: dashboard.php");
?>
