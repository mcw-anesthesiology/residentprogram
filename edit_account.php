<?php
	session_start();
	require "init.php";
	
	$username = $mysqli->escape_string($_POST["username"]);
	$firstName = $mysqli->escape_string($_POST["firstName"]);
	$lastName = $mysqli->escape_string($_POST["lastName"]);
	$trainingLevel = $mysqli->escape_string($_POST["trainingLevel"]);
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php");
	}

	$mysqli->query("update users set firstName='{$firstName}', lastName='{$lastName}', trainingLevel='{$trainingLevel}', modifiedDate=CURRENT_TIMESTAMP where username='{$username}';");
	header("Location: manage_accounts.php");
?>
