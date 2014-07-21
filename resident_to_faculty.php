<?php
	
	session_start();
	require "init.php";
	
	$username = $_POST["username"];
	$type = "";
	
	$success = "false";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
	
	if($userStmt = $mysqli->prepare("select type from users where username=?;")){
		if($userStmt->bind_param("s", $username)){
			if($userStmt->execute()){
				$userStmt->bind_result($type);
				$userStmt->fetch();
			}
		}
		$userStmt->close();
	}
	
	if($type === "resident"){
		if($stmt = $mysqli->prepare("update users set type='faculty' where username=?;")){
			if($stmt->bind_param("s", $username)){
				if($stmt->execute()){
					$success = "true";
				}
			}
		}
	}
	
	header("Location: manage_accounts.php?success={$success}");

?>
