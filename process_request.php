<?php 
	//This page requests a new evaluation for a specified faculty member to complete in regards to a specified resident. It is called by request.php
	//If requested by a faculty member, it brings the user to the the complete_specific page
	//for the newly created request. Otherwise, it returns the user to the dashboard with a success GET attribute ("true" or "false")

	session_start();
	require "init.php";
	
	
	$evaluationForm = htmlspecialchars($_POST["evaluationForm"]);
	
		
	if($_SESSION["type"] == "resident")
		$resident = htmlspecialchars($_SESSION["username"]);
	else
		$resident = htmlspecialchars($_POST["resident"]);
		
	if($_SESSION["type"] == "faculty")
		$faculty = htmlspecialchars($_SESSION["username"]);
	else
		$faculty = htmlspecialchars($_POST["faculty"]);
		
		
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
		 
	$success = "false";
		 
	$requestDate = date("Y-m-d H:i:s");
	$status = "pending";
	
	if($stmt = $mysqli->prepare("insert into `requests` (formId, resident, faculty, requestedBy, status, requestDate, ipAddress) values (?, ?, ?, ?, ?, ?, ?);")){
		if($stmt->bind_param("issssss", $evaluationForm, $resident, $faculty, $_SESSION["username"], $status, $requestDate, $ipaddress)){
			if($stmt->execute()){
				$success = "true";
				$requestId = $stmt->insert_id;
				if($_SESSION["type"] == "resident"){
				if($emailrequeststmt = $mysqli->prepare("select email,lastName from users WHERE username=?")){
                		if($emailrequeststmt->bind_param("s",$faculty)){
                        	if($emailrequeststmt->execute()){
                                $email_get_success=1;
                                $emailrequeststmt->bind_result($faculty_email,$faculty_lastname);
                                $emailrequeststmt->fetch();
                                $emailrequeststmt->close();
                                $formrequeststmt = $mysqli->prepare("select title from forms WHERE formId=?");
                                $formrequeststmt->bind_param("i",$evaluationForm);
                                $formrequeststmt->execute();
                                $formrequeststmt->bind_result($form_name);
                                $formrequeststmt->fetch();
                                $formrequeststmt->close();
                                if(isset($faculty_email))
                                {
                                        $email_from = "eval_system@residentprogram.com";
                                        $email_subject = "New " . $form_name . " Evaluation Request from " .  $_SESSION["fname"] . " " . $_SESSION["lname"];
                                        $email_txt="Dear Dr. " . $faculty_lastname . ":\n\n";
                                        $email_txt.="A resident has requested that you complete an evaluation of their performance.\n\n";
					$email_txt.="Requesting Resident: " . $_SESSION["fname"] . " " . $_SESSION["lname"] . "\n";
					$email_txt.="Subject: " . $form_name . "\n\n";
                                        $email_txt.="Please log into the evaluation system at http://residentprogram.com to complete this evaluation at your earliest convenience.\n\n---------\n";
                                        $email_txt.="This email address is not monitored; responses to this email will not be read.  If you require assistance, please email kjenner@mcw.edu\n\n";
                                        $email_txt.="AUTOMATICALLY GENERATED MESSAGE SERVICE AT RESIDENTPROGRAM.COM";
                                        $email_txt = wordwrap($email_txt, 80, "\n");
                                        $email_headers = 'From: ' . $email_from . "\n" . 'X-Mailer: PHP/5.5';
                                        mail($faculty_email, $email_subject, $email_txt, $email_headers);
                                }
                                else
                                {
                                        print "Faculty email not found.";
                                }
                        }
                        else { print $emailrequeststmt->error; }
                }
                else { print $emailrequeststmt->error; }

        }
        else { print $emailrequeststmt->error;}
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
		$mysqli->error;
	}
				
	
	if($_SESSION["type"] == "faculty"){
		header("Location: complete_specific.php?request={$requestId}");
	}
	else{
		header("Location: dashboard.php?request={$success}");
	}
	//print "complete.";
?>

