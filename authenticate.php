<?php
	require "init.php";
	session_destroy();
	
	$username = htmlspecialchars($_POST["username"]);
	$password = md5(htmlspecialchars($_POST["password"])); //have to encrypt this better--password_hash()
	
	$users = $mysqli->query("select username, password, type, firstName, lastName from users where username='{$username}' and password='{$password}' and status='active';");
	$user = $users->fetch_assoc();
	$num = $users->num_rows;
	if($num == 1){
		session_start();
		$_SESSION["username"] = $username;
		$_SESSION["type"] = $user["type"];
		$_SESSION["fname"] = $user["firstName"];
		$_SESSION["lname"] = $user["lastName"];
		header("Location: dashboard.php");
	}
	else{
		header("Location: index.php");
	}

?>
