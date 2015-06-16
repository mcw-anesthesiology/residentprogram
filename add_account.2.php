<?php
	//This page adds a new account to the users table. It is called by manage_users.php and returns there afterward with a success GET attribute which is either "true" or "false".
	//TODO: Ensure that both password entries are the same before doing anything, no idea why this wasn't done yet. 
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}

	function email_new_fuser($user,$pass,$first,$last,$email_address)
	{
		$message = "Dear Dr. " . $last . ":\n\n";
		$message.= "A faculty account has been created for you on the new Resident Milestone Evaluation Program (residentprogram.com).  This system will eventually replace New Innovations for anesthesiology resident evaluations, and is required by the ACGME's new milestones evaluation paradigm and the Next Accreditation System developed in conjunction with the American Board of Anesthesiology.\n\n";

		$message.= "We hope the system is simple and intuitive to use.  If you encounter any problems, please email me directly at kjenner@mcw.edu\n\n";

		$message.= "Instructions for login:\n";
		$message.= "1. Go to https://www.residentprogram.com\n";
		$message.= "2. Enter your username: " . $user . "\n";
		$message.= "3. Enter your password: " . $pass . "   (You can change your password after you log in)\n";
		$message.= "4. Click Login.\n";
		$message.= "5a. Residents may submit requests for evaluation to you online; any pending requests will be displayed in a list immediately after logging in.  If there are pending requests, click the item to complete the evaluation.\n";
		$message.= "5b. If no pending requests exist and you would like to create an evaluation of a resident, click Create Evaluation at the top of the screen.\n";
		$message.= "6. Choose the resident you would like to evaluate.\n";
		$message.= "7. Choose the evaluation form you will be using for the evaluation (OB, RAAPS, Night float, PAT, and Pediatrics are currently available).  Others will be added soon.\n";
		$message.= "8. Click Submit; a new evaluation should open immediately and you may complete it for that resident.\n\n";

		$message.= "NOTE: When completing evaluations, there are descriptors for each selection which appear if you move your mouse pointer over the selection bubbles.  For instance, to see what traits / abilities / behaviors a CA-1 should have before you answer a particular question, hover your mouse pointer over the \"CA-1\" option and a box will appear describing a competent CA-1's performance in that area.  If you cannot see these hover-over descriptions or if they disappear too quickly for you to read, you may click \"Show Descriptions\" directly below of any question and the descriptions will appear for you.  (This is also the only way to see the descriptions if using an iPad or other mobile touchscreen device).\n\n";

		$message.= "You may also receive an email from the system indicating a resident has requested an evaluation of their performance.  This is to alert you that an evaluation is pending for completion in the Milestones system.  In the future, reminder emails will be sent on a daily, weekly, or semiweekly basis to notify you of any pending evaluations awaiting completion (scheduled \"reminder emails\" is a feature which is undergoing testing and is not yet active).\n\n";

		$message.= "I recommend you change your password immediately after logging in the first time.  To change your password, click your name in the top-right corner of the screen, then click \"Manage Account\" and follow the instructions on the screen\n\n";

		$message.= "Thank you for your patience as we continue to roll out the new evaluation system.  If your department or area does not yet have an evaluation built into the Milestones system, continue to use New Innovations to evaluate residents on your service.  Please report any suggestions or bugs detected in the system directly to me at kjenner@mcw.edu.\n\n";

		$message.= "Regards,\nKevin Jenner";
	
		$from_email = "eval_system@residentprogram.com";
		$subject = "Welcome to the new Milestones Evaluation System (ResidentProgram.com)";
		$to = $email_address;
		$headers= 'From: '. $from_email . "\r\n" . 'Reply-To: ' . $from_email . "\r\n" . 'X-Mailer: PHP/' . phpversion();
		if(mail($to,$subject,$message,$headers)){ return 1; }
		else{ return 0; }
	}
	
	$username = $_POST["username"];
	$email = $_POST["email"];
	$original_password = $_POST["password"];
	$password = password_hash(htmlspecialchars($_POST["password"]), PASSWORD_DEFAULT);
	$password2 = password_hash(htmlspecialchars($_POST["password2"]), PASSWORD_DEFAULT);
	$firstName = $_POST["firstName"];
	$lastName = $_POST["lastName"];
	$accountType = $_POST["accountType"];
	$trainingLevel = $_POST["trainingLevel"];
	$evaluationDate = date("Y-m-d H:i:s");
	$status = "active";
	
	$success = "false";
	
	foreach ($_POST as $value){
		if($value == "")
			header("Location: manage_accounts.php?success=false");
	}
	
	if(filter_var($email, FILTER_VALIDATE_EMAIL)){
		header("Location: manage_accounts.php?success=false");
	}
	
	$photoPath = "";
	
	if($accountType == "resident" && $_FILES["photo"]["error"] === UPLOAD_ERR_OK){
		if($_FILES["photo"]["type"] == "image/jpg" || $_FILES["photo"]["type"] == "image/jpeg" || $_FILES["photo"]["type"] == "image/png"){
			$photoPath = "photos/".uniqid().".".pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION);
			move_uploaded_file($_FILES["photo"]["tmp_name"], $photoPath);
		}
	}
	
	//The only difference between the two following cases is the trainingLevel attribute, it's null if not a resident
	if($accountType == "resident"){
		if($stmt = $mysqli->prepare("insert into users (username, password, email, firstName, lastName, type, status, createdDate, trainingLevel, photo) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("ssssssssss", $username, $password, $email, $firstName, $lastName, $accountType, $status, $evaluationDate, $trainingLevel, $photoPath))
				if($stmt->execute()){
					$success = "true";
				}
				else{
					print $stmt->error;
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
		if($stmt = $mysqli->prepare("insert into users (username, password, email, firstName, lastName, type, status, createdDate) values (?, ?, ?, ?, ?, ?, ?, ?);")){
			if($stmt->bind_param("ssssssss", $username, $password, $email, $firstName, $lastName, $accountType, $status, $evaluationDate))
				if($stmt->execute()){
					$success = "true";
					email_new_fuser($username,$original_password,$firstName,$lastName,$email);
				}
				else{
					print $stmt->error;
				}
			else{
				print $stmt->error;
			}
		}
		else{
			print $mysqli->error;
		}
	}
	
	//header("Location: manage_accounts.php?success={$success}");
?>
