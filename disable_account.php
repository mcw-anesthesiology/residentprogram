<?php
	session_start();
	require "init.php";
	
	$username = $_POST["username"];
	$mysqli->query("update users set status='inactive' where username='{$username}'");
	header("Location: manage_accounts.php");
?>
