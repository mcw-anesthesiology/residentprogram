<?php
	//This page checks a user's credentials against the database and creates a session and logs the user in if a user with such credentials exist. 
	//It is called from index.php and sends the user to dashboard.php upon successful login.
	require "init.php";
	session_destroy();
	
	$username = htmlspecialchars($_POST["username"]);
	$password = htmlspecialchars($_POST["password"]); 
	
	if($stmt = $mysqli->prepare("select password, type, firstName, lastName from users where username=? and status='active';")){
		if($stmt->bind_param("s", $username)){
			if($stmt->execute()){
				$stmt->bind_result($passwordHash, $type, $firstName, $lastName);
				$stmt->fetch();
			}
			else{
				print $stmt->error;
			}
		}
		else{
			print $stmt->error;
		}
	}
	else{
		print $mysqli->error;
	}
	
	if(password_verify($password, $passwordHash)){
		session_start();
		$_SESSION["username"] = $username;
		$_SESSION["type"] = $type;
		$_SESSION["fname"] = $firstName;
		$_SESSION["lname"] = $lastName;
		header("Location: dashboard.php");
	}
	else{
		header("Location: index.php");
	}

?>
