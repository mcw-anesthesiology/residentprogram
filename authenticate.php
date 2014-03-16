<?php
	require "init.php";
	session_destroy();
	
	$username = htmlspecialchars($_POST["username"]);
	$password = md5(htmlspecialchars($_POST["password"])); //have to encrypt this better
	
	$res = $mysqli->query("select id, password, type, firstName, lastName from users where id='{$username}' and password='{$password}'");
	$row = $res->fetch_assoc();
	$num = mysqli_num_rows($res);
	if($num == 1){
		session_start();
		$_SESSION["username"] = $username;
		$_SESSION["type"] = $row["type"];
		$_SESSION["fname"] = $row["firstName"];
		$_SESSION["lname"] = $row["lastName"];
		header("Location: dashboard.php");
	}
	else{
		header("Location: index.php");
	}

?>
