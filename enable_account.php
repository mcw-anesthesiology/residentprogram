<?php
	session_start();
	require "init.php";
	
	$username = $_POST["username"];
	$query = "update users set status = 'active' where username = '$username'";
	mysqli_query($mysqli,$query);
	header("Location: manage_accounts.php");
?>
