<?php
	ini_set('display_errors', 1); ini_set('error_reporting', E_ALL); error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
	$mysqli = new mysqli("localhost", "mcw", "BobbyLite", "mcw");
	if($mysqli->connect_errno){
		echo "Failed to connect to MySQL: " . $mysqli->connect_errno . " ) " . $mysqli->connect_error;
	}
	
	$username = htmlspecialchars($_POST["username"]);
	$password = md5(htmlspecialchars($_POST["password"])); //have to encrypt this better
	
	$res = $mysqli->query("select id, password, type from users where id='{$username}' and password='{$password}'");
	$row = $res->fetch_assoc();
	$num = mysqli_num_rows($res);
	if($num == 1){
		session_start();
		$_SESSION["username"] = $username;
		$_SESSION["password"] = $password;
		$_SESSION["type"] = $row["type"];
		header("Location: dashboard.php");
	}
	else{
		header("Location: index.php");
	}

?>
