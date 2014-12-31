<?php
	//This page stores a completed evaluation in the system. It is called by complete_specific.php and directs the user to dashboard.php afterward. 

	//TODO: Don't store weights in the responses table, put them in their own table
	session_start();
	require "init.php";
	
	if(!isset($_POST["requestId"]))
		header("Location: dashboard.php");
	
	if(isset($_POST["requestId"])){ //TODO: make sure required fields are completed when submitting completed form
		$status = "complete";
		$requestId = $mysqli->escape_string($_POST["requestId"]);
	}
	else if(isset($_POST["requestIdSaved"])){
		$status = "pending";
		$requestId = $mysqli->escape_string($_POST["requestIdSaved"]);
	}

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
		 
	$completeDate = date("Y-m-d H:i:s");
	$evaluationDate = $_POST["evaluationDate"];
	
	//Set request status to complete
	$request = $mysqli->query("select resident, formId, status from requests where requestId='{$requestId}';")->fetch_assoc();
	if($request["status"] == "complete"){
		header("Location: dashboard.php");
	}
	
	$user = $mysqli->query("select trainingLevel from users where username='{$request["resident"]}';")->fetch_assoc();
	$formId = $mysqli->escape_string($request["formId"]);
	$currentTrainingLevel = $user["trainingLevel"];
	
	//Insert ipAddress and currentTrainingLevel into evaluations
	if($stmt = $mysqli->prepare("insert into `evaluations` (`requestId`, `ipAddress`, `currentTrainingLevel`) values (?, ?, ?);")){
		$stmt->bind_param("iss", $requestId, $ipaddress, $currentTrainingLevel);
		$stmt->execute();
	}
	if($requestStmt = $mysqli->prepare("update `requests` set `completeDate`=?, `evaluationDate`=?, status=? where `requestId`=?;")){
		$requestStmt->bind_param("sssi", $completeDate, $evaluationDate, $status, $requestId);
		$requestStmt->execute();
	}
	
	//Record numeric response
	if($responseStmt = $mysqli->prepare("insert into `responses` (`requestId`, `questionId`, `response`, `weight`) values (?, ?, ?, ?);"))
		$responseStmt->bind_param("isii", $requestId, $question, $response, $questionWeight);
	else echo $mysqli->error;
	
	//Update numeric response
	if($updateResponseStmt = $mysqli->prepare("update `responses` set `response`=?,`weight`=? where `requestId`=? and `questionId`=?;"))
		$updateResponseStmt->bind_param("iiis", $response, $questionWeight, $requestId, $question);
	else echo $mysqli->error;
	
	//Record textual response
	if($textStmt = $mysqli->prepare("insert into `textResponses` (`requestId`, `questionId`, `response`) values (?, ?, ?);"))
		$textStmt->bind_param("iss", $requestId, $question, $response);
	else echo $mysqli->error;
	
	//Update textual response
	if($updateTextStmt = $mysqli->prepare("update `textResponses` set `response`=? where `requestId`=? and `questionId`=?;"))
		$updateTextStmt->bind_param("sis", $response, $requestId, $question);
	else echo $mysqli->error;

	foreach ($_POST as $question => $response){
		$question = $mysqli->escape_string($question);
		$response = $mysqli->escape_string($response);
		
		if($question == "requestId" || $question == "requestIdSaved"){
			
		}
		else if(strpos($question, "weight") !== false){
			$questionWeight = $response;
		}
		else if(is_numeric($response)){
			if(!$responseStmt->execute())
				$updateResponseStmt->execute();
				
			$questionWeight = "";
		}
		else{
			if($response !== "" && $question != "evaluationDate")
				if(!$textStmt->execute())
					$updateTextStmt->execute();
		}
	}
	
	header("Location: dashboard.php");
	
?>
