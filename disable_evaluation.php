<?php
	//This page disables a specified evaluation. It is called by manage_evaluations.php and returns there afterward with a success value ("true" or "false")
	session_start();
	require "init.php";

	if($_SESSION["type"] !== "admin" || !isset($_POST["requestId"])){
		echo "false";
	}

	$success = "false";

	$requestId = $_POST["requestId"];
	if($stmt = $mysqli->prepare("update requests set status='disabled' where requestId=?")){
		if($stmt->bind_param("s", $requestId)){
			if($stmt->execute()){
				$success = "<span class='badge badge-disabled'>disabled</span>";
			}
			else{

			}
		}
		else{

		}
	}
	else{

	}

	echo $success;
?>
