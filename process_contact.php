<?php

session_start();
include "init.php";

$response = "false";
$adminEmail = "jmischka@mcw.edu";

if(isset($_POST["subject"]) && isset($_POST["body"]) && strlen($_POST["subject"]) > 0 && strlen($_POST["body"]) > 0){

	if($stmt = $mysqli->prepare("insert into contact(username, subject, body) values(?, ?, ?)")){
		if($stmt->bind_param("sss", $_SESSION["username"], $_POST["subject"], $_POST["body"])){
			if($stmt->execute()){
				$response = "success";
				$userStmt = $mysqli->prepare("select firstName, lastName, email from users where username=?");
				$userStmt->bind_param("s", $_SESSION["username"]);
				$userStmt->bind_result($firstName, $lastName, $email);
				$userStmt->execute();
				$userStmt->fetch();
				
				if(isset($email)){
					$emailFrom = "contact@residentprogram.com";
					$emailSubject = "ResidentProgram: ".$_POST["subject"];
					$emailBody = $_POST["body"]."\n".$firstName." ".$lastName."\n".$email;
					$emailHeaders = "From: ".$emailFrom."\n"."X-Mailer: PHP/5.5";
					mail($adminEmail, $emailSubject, $emailBody, $emailHeaders);
				}
				$userStmt->close();	
			}
		}
	}
	$stmt->close();
}

echo $response;


