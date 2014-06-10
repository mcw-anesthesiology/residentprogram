<?php
	//TODO: documentation
	
	session_start();
	require "init.php";
	
	$username = $_SESSION["username"];
	$oldPassword = htmlspecialchars($_POST["oldPassword"]);
	$newPassword = htmlspecialchars($_POST["newPassword"]);
	$newPassword2 = htmlspecialchars($_POST["newPassword2"]);
	
	$success = "false";
	
	if($newPassword !== $newPassword2){
		print "New passwords do not match";
		header("Location: manage_user.php?success=false");
	}
	
	$newPassword = password_hash($newPassword, PASSWORD_DEFAULT);
	
	if($stmt = $mysqli->prepare("select password from users where username=?;")){
		if($stmt->bind_param("s", $username)){
			if($stmt->execute()){
				$stmt->bind_result($passwordHash);
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
	
	$stmt->close();
	
	if(password_verify($oldPassword, $passwordHash)){
		if($stmt = $mysqli->prepare("update users set password=? where username=?;")){
			if($stmt->bind_param("ss", $newPassword, $username)){
				if($stmt->execute()){
					$success = "true";
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
	}
	else{
		print "Old password does not match";
	}
	
	header("Location: manage_user.php?success={$success}");
?>
