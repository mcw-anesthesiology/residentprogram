<?php
	//TODO: documentation

	session_start();
	require "init.php";

	if(isset($_POST["hash"])){
		$hash = $_POST["hash"];
		$user = $mysqli->query("select username from reset_password where hash='{$hash}'")->fetch_assoc();
		$username = $user["username"];
		$oldPassword = "";
	}
	else{
		$username = $_SESSION["username"];
		$oldPassword = htmlspecialchars($_POST["oldPassword"]);
	}

	$newPassword = htmlspecialchars($_POST["newPassword"]);
	$newPassword2 = htmlspecialchars($_POST["newPassword2"]);

	$success = "false";

	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_user.php?success=false");
	}

	if($newPassword !== $newPassword2){
		//print "New passwords do not match";
		header("Location: manage_user.php?success=false");
	}

	$newPassword = password_hash($newPassword, PASSWORD_DEFAULT);

	if(isset($user)){
		$newPasswordPhpBB = phpbb_hash($newPassword2);
		$userIdPhpBB = $user->data["user_id"];
		//print $userIdPhpBB."<br />";
		//print $newPasswordPhpBB."<br />";

		$mysqliPhpBB = new mysqli("localhost", "phpbbuser", "m^fvaD3MpA9-GwoL@6", "phpbb");
		if($stmtPhpBB = $mysqliPhpBB->prepare("update phpbb_users set user_password=? where user_id=?")){
			if($stmtPhpBB->bind_param("ss", $newPasswordPhpBB, $userIdPhpBB)){
				if($stmtPhpBB->execute()){
					//print "phpBB user password successfully changed";
				}
				else{
					print $stmtPhpBB->error;
				}
			}
			else{
				print $stmtPhpBB->error;
			}
			$stmtPhpBB->close();
		}
		else{
			print $mysqliPhpBB->error;
		}
	}
	if($oldPassword != ""){
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
	}

	$modifiedDate = date("Y-m-d H:i:s");

	if(isset($hash) || password_verify($oldPassword, $passwordHash)){
		if($stmt = $mysqli->prepare("update users set password=?, modifiedDate=? where username=?")){
			if($stmt->bind_param("sss", $newPassword, $modifiedDate, $username)){
				if($stmt->execute()){
					$success = "true";
					if(isset($hash))
						$mysqli->query("delete from reset_password where hash='{$hash}'");
				}
				else{
					print $stmt->error;
				}
			}
			else{
				print $stmt->error;
			}
			$stmt->close();
		}
		else{
			print $mysqli->error;
		}
	}
	else{
		//print "Old password does not match";
	}

	header("Location: manage_user.php?success={$success}");
?>
