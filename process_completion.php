<?php
	//TODO: make sure evaluation not already completed before doing thigns
	session_start();
	require "init.php";
	
	if(!isset($_POST["requestId"]))
		header("Location: dashboard.php");
	else
		$requestId = $_POST["requestId"];

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
		 
	$evaluationDate = date("Y-m-d H:i:s");
	
	
	$request = $mysqli->query("select resident, formId from requests where requestId='{$requestId}';")->fetch_assoc();
	$user = $mysqli->query("select trainingLevel from users where username='{$request["resident"]}';")->fetch_assoc();
	$formId = $request["formId"];
	$currentTrainingLevel = $user["trainingLevel"];
	
	$mysqli->query("insert into `evaluations` (`requestId`, `ipAddress`, `currentTrainingLevel`) values ('{$requestId}', '{$ipaddress}', '{$user["trainingLevel"]}');");
	$mysqli->query("update `requests` set `completeDate`='{$evaluationDate}', status='complete' where `requestId`='{$requestId}';");

	foreach ($_POST as $question => $response){
		if(strpos($question, "q") === 0){
			$mysqli->query("insert into `responses` (`requestId`, `formId`, `questionId`, `response`) values ('{$requestId}', '{$formId}', '{$question}', '{$response}');");
		}
		else if(strpos($question, "t") === 0){
			$mysqli->query("insert into `textResponses` (`requestId`, `formId`, `questionId`, `response`) values ('{$requestId}', '{$formId}', '{$question}', '{$response}');");
		}
	}
	
	header("Location: dashboard.php");
	
?>
