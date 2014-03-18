<?php
	session_start();
	require "init.php";
	
	$username = htmlspecialchars($_POST["username"]);
	$password = md5(htmlspecialchars($_POST["password"]));
	$firstName = htmlspecialchars($_POST["firstName"]);
	$lastName = htmlspecialchars($_POST["lastName"]);
	$accountType = htmlspecialchars($_POST["accountType"]);

	$mysqli->query("insert into users (username,password,firstName,lastName,type,status,createdDate) values ('{$username}','{$password}','{$firstName}','{$lastName}','{$accountType}','active',CURRENT_TIMESTAMP);");
	header("Location: manage_accounts.php");
?>