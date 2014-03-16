<?php
	//TODO: make sure evaluation not already completed before doing thigns
	session_start(); 
	ini_set('display_errors', 1); ini_set('error_reporting', E_ALL); error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
	if(empty($_SESSION["username"])){ 
		header("Location: index.php"); 
	}
	if(!isset($_GET["request"]))
		header("Location: dashboard.php");
	else
		$requestId = $_GET["request"];

	$mysqli = new mysqli("localhost", "mcw", "BobbyLite", "mcw");
	if($mysqli->connect_errno){
		echo "Failed to connect to MySQL: " . $mysqli->connect_errno . " ) " . $mysqli->connect_error;
	}

	$formId = "1"; //obviously only for now
	
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
	
	$currentCA = "CA-1"; //MUST REPLACE THIS WHEN I REDO THE USERS TABLE
	
	$mysqli->query("insert into `evaluations` (`requestId`, `formId`, `ip`, `evaluationDate`, `currentCALevel`) values ('{$requestId}', '{$formId}', '{$ipaddress}', '{$evaluationDate}', '{$currentCA}');");
	$mysqli->query("update `requests` set `completeDate`='{$evaluationDate}' where `id`='{$requestId}';");

	foreach ($_POST as $question => $response){
		$mysqli->query("insert into `responses` (`requestId`, `formId`, `questionId`, `response`) values ('{$requestId}', '{$formId}', '{$question}', '{$response}');");
		echo "insert into `responses` (`requestId`, `formId`, `questionId`, `response`) values ('{$requestId}', '{$formId}', '{$question}', '{$response}');";
	}
	
?>
