<?php
	session_start();
	require "init.php";
	
	$requestId = $_POST["requestId"];
	
	$success = "false";
	
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
	
	header("Location: manage_evaluations.php?success={$success}");
?>
