<?php
	session_start();
	require "init.php";
	
	$requestId = $_POST["requestId"];
	$query = "update requests set status = 'disabled' where requestId = $requestId";
	mysqli_query($mysqli,$query);
	header("Location: manage_evaluations.php");
?>
