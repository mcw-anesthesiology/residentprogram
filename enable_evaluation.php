<?php
	//This page enables a specified evaluation. It is called by manage_evaluations.php and returns there afterward with a success value ("true" or "false")
	session_start();
	require "init.php";

	if($_SESSION["type"] !== "admin" || !isset($_POST["requestId"])){
		echo "false";
	}

	$requestId = $_POST["requestId"];

	$success = "false";
	$status = "false";

	$resultComplete = $mysqli->query("select completeDate from requests where requestId='{$requestId}'");
	$row = $resultComplete->fetch_assoc();

	if(is_null($row["completeDate"])){
		$status = "pending";
	}
	else{
		$status = "complete";
	}

	if($stmt = $mysqli->prepare("update requests set status=? where requestId=?")){
		if($stmt->bind_param("ss", $status, $requestId)){
			if($stmt->execute()){
				$success = "true";
			}
			else{

			}
		}
		else{

		}
	}
	else{

	}
	if($success == "true")
		echo $status;
	else
		echo $success;
?>
