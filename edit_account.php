<?php
	session_start();
	require "init.php";
	
	$username = htmlspecialchars($_POST["username"]);
	$firstName = htmlspecialchars($_POST["firstName"]);
	$lastName = htmlspecialchars($_POST["lastName"]);

	$mysqli->query("update users set firstName='{$firstName}', lastName='{$lastName}', modifiedDate=CURRENT_TIMESTAMP where username='{$username}';");
	header("Location: manage_accounts.php");
?>