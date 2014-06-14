<?php
	//This page checks a user's credentials against the database and creates a session and logs the user in if a user with such credentials exist. 
	//It is called from index.php and sends the user to dashboard.php upon successful login.
	require "init.php";
	
	session_destroy();
	
        include_once("phpbbconf.php");
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
		$auth->login($username,$password,0,1,0);
		header("Location: dashboard.php");
		//print "<br />From Authenticate.php: Login apparently successful.  Details follow.<br />" . "PHPBB Username: " . $user->data['username'] . "<br />" . "Eval System User Name: " . $_SESSION["username"];
		
	}
	else{
		header("Location: index.php");
		
	}
	//include("init.php");
?>
