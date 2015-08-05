<?php

namespace App\Helpers;

class Mail{

	static function email_new_ruser($user,$pass,$first,$last,$email_address)
		{
		$message = "Dear Dr. " . $last . ":\n\n";
		$message.= "A new resident user account has been created for you on the Milestones Evaluation Site, residentprogram.com\n\n";
		$message.= "This website will replace New Innovations for resident evaluations, and the new Milestones Evaluation Model is required by the ACGME and the American Board of Anesthesiology (ABA).\n\n";

		$message.= "We hope you find the system simple and easy to use.\nBasic Instructions:";

		$message.= "1. Go to www.residentprogram.com\n";
		$message.= "2. Enter your username: " . $user . "\n";
		$message.= "3. Enter your password: " . $pass . "\n";
		$message.= "4. Click Login.\n";
		$message.= "5. To request an evaluation from a faculty member, click on \"Request Evaluation\" at the top of the page.\n";
		$message.= "6. Choose the faculty member you want to evaluate you.\n";
		$message.= "7. Choose the evaluation form they should use (all eval forms will be loaded for all rotations by the beginning of August 2014).\n";
		$message.= "8. Click Submit.\n\n";

		$message.= "The faculty will be notified immediately by email that you've requested an evaluation from them.  You can use the dashboard in the system to review the results of your evaluations, check on the status of pending evaluations, or cancel evaluations requested in error.\n\n";

		$message.= "We strongly recommend you change your password immediately after logging in the first time.  To change your password, click your name in the top-right corner of the screen, then click Change Password and follow the instructions on the screen.\n\n";

		$message.= "As part of the Evaluation System beta testers, you'll also have access to the new MCW Anesthesiology Resident Forum.  This is a place for residents and faculty to discuss topics of interest, upload educational resources or links, and organize social events.  You can access the forum by clicking the MCW Forum link at the top of any page in the evaluation system.  You should be automatically logged into the forum when you log into the evaluation system.\n\n";

		$message.= "If you run into any difficulties or problems, please use the contact page or email jmischka@mcw.edu.\n\n";

				$from_email = "eval_system@residentprogram.com";
				$subject = "Welcome to the new Milestones Evaluation System (ResidentProgram.com)";
				$to = $email_address;
				$headers= 'From: '. $from_email . "\r\n" . 'Reply-To: ' . $from_email . "\r\n" . 'X-Mailer: PHP/' . phpversion();
				if(mail($to,$subject,$message,$headers)){ return 1; }
				else{ return 0; }
		}


	static function email_new_fuser($user,$pass,$first,$last,$email_address)
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

		$message.= "Thank you for your patience as we continue to roll out the new evaluation system.  If your department or area does not yet have an evaluation built into the Milestones system, continue to use New Innovations to evaluate residents on your service.  Please report any suggestions or bugs detected in the system directly via the contact page or to jmischka@mcw.edu.\n\n";

		$from_email = "eval_system@residentprogram.com";
		$subject = "Welcome to the new Milestones Evaluation System (ResidentProgram.com)";
		$to = $email_address;
		$headers= 'From: '. $from_email . "\r\n" . 'Reply-To: ' . $from_email . "\r\n" . 'X-Mailer: PHP/' . phpversion();
		if(mail($to,$subject,$message,$headers)){ return 1; }
		else{ return 0; }
	}
}
