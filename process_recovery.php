<?php
	require "init.php";

	$email = $_POST["email"];
	$username = "";

	$success = "false";
	$date = date("Y-m-d H:i:s");
	$hourDateTime = new DateTime();
	$hourDateTime->sub(new DateInterval("PT1H"));
	$hourDate = $hourDateTime->format("Y-m-d H:i:s");

	$ipaddress = "";
	if ($_SERVER["HTTP_CLIENT_IP"])
	$ipaddress = $_SERVER["HTTP_CLIENT_IP"];
	else if($_SERVER["HTTP_X_FORWARDED_FOR"])
	$ipaddress = $_SERVER["HTTP_X_FORWARDED_FOR"];
	else if($_SERVER["HTTP_X_FORWARDED"])
	$ipaddress = $_SERVER["HTTP_X_FORWARDED"];
	else if($_SERVER["HTTP_FORWARDED_FOR"])
	$ipaddress = $_SERVER["HTTP_FORWARDED_FOR"];
	else if($_SERVER["HTTP_FORWARDED"])
	$ipaddress = $_SERVER["HTTP_FORWARDED"];
	else if($_SERVER["REMOTE_ADDR"])
	$ipaddress = $_SERVER["REMOTE_ADDR"];
	else
	$ipaddress = "UNKNOWN";

	$failedAttempts = $mysqli->query("select attemptId from reset_attempts where ipAddress='{$ipAddress}' and date>'{$hourDate}'");
	if($failedAttempts->num_rows > 3){
		header("Location: recover_password.php?success=false");
	}


	if($stmt = $mysqli->prepare("select username, email from users where email=?;")){
		if($stmt->bind_param("s", $email)){
			if($stmt->bind_result($username, $dbEmail)){
				if($stmt->execute()){
					if($stmt->fetch()){

					}
				}
				else{

				}
			}
			else{

			}
		}
		else{

		}
	}
	else{

	}

	if($username !== ""){
		//send email
		//change password to random string
		$length = 15;
		$bytes = openssl_random_pseudo_bytes($length);
		$hex = bin2hex($bytes);
		$user = $mysqli->query("select firstName, lastName from users where username='{$username}'")->fetch_assoc();
		$url = "http://www.residentprogram.com/reset_password.php?hash=".$hex;

		$email_from = "password@residentprogram.com";
		$email_subject = "Password Reset Requested";
		$email_txt="Dear ". $user["firstName"]. " " . $user["lastName"] . ":\n\n";
		$email_txt.="A password reset has been requested for your account. ";
		$email_txt.="If you made this request, please navigate to this address in your browser. Do not share this link with anyone.\n\n";
		$email_txt.="\t".$url."\n\n";
		$email_txt.="This email address is not monitored; responses to this email will not be read.  If you require assistance, please email kjenner@mcw.edu\n\n";
		$email_txt.="AUTOMATICALLY GENERATED MESSAGE SERVICE AT RESIDENTPROGRAM.COM";
		$email_txt = wordwrap($email_txt, 80, "\n");
		$email_headers = 'From: ' . $email_from . "\n" . 'X-Mailer: PHP/5.5';
		mail($dbEmail, $email_subject, $email_txt, $email_headers);

		if($stmt = $mysqli->prepare("insert into reset_password(username, hash) values(?, ?)")){
			if($stmt->bind_param("ss", $username, $hex)){
				if($stmt->execute()){
					$success = "true";
				}
			}
		}
	}
	else{
		//log incorrect email for ip address
		$mysqli->query("insert into reset_attempts(ipAddress, date) values('{$ipAddress}', '{$date}')");
	}

	header("Location: recover_password.php?success={$success}");


?>
