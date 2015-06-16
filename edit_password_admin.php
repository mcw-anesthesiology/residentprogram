<?php
	//TODO: documentation
	
	session_start();
	require "init.php";
	
	$username = htmlspecialchars($_POST["username"]);
	$adminUsername = $_SESSION["username"];
	$adminPassword = htmlspecialchars($_POST["adminPassword"]);
	$newPassword = htmlspecialchars($_POST["newPassword"]);
	$newPassword2 = htmlspecialchars($_POST["newPassword2"]);
	
	$success = "false";
	$phpbbsuccess = "false";
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php?success=false");
	}
	
	if($newPassword !== $newPassword2){
		print "New passwords do not match";
		header("Location: manage_accounts.php?success=false");
	}
	
	$newPassword = password_hash($newPassword, PASSWORD_DEFAULT);
	
	if($stmt = $mysqli->prepare("select password from users where username=?;")){
		if($stmt->bind_param("s", $adminUsername)){
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
	
	if(password_verify($adminPassword, $passwordHash)){
		if($stmt = $mysqli->prepare("update users set password=? where username=?;")){
			if($stmt->bind_param("ss", $newPassword, $username)){
				if($stmt->execute()){
					$success = "true";
					
					$stmt->close();
					
					$newPasswordPhpBB = phpbb_hash($newPassword2);
					//$userIdPhpBB = $user->data["user_id"];
					//print $userIdPhpBB."<br />";
					//print $newPasswordPhpBB."<br />";
					
					$mysqliPhpBB = new mysqli("localhost", "ab49752_phpbb", "m^fvaD3MpA9-GwoL@6", "ab49752_phpbb");
					if($stmtPhpBB = $mysqliPhpBB->prepare("update phpbb_users set user_password=? where username=?")){
						if($stmtPhpBB->bind_param("ss", $newPasswordPhpBB, $username)){
							if($stmtPhpBB->execute()){
//								print "phpBB user password successfully changed";
								$phpbbsuccess = "true";
							}
							else{
								print $stmtPhpBB->error;
							}
						}
						else{
							print $stmtPhpBB->error;
						}
					}
					else{
						print $mysqliPhpBB->error;
					}
					
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
	
	header("Location: manage_accounts.php?password={$success}&phpbbpass={$phpbbsuccess}");
?>
