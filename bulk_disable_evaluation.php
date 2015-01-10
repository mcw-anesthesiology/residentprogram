<?php
	include "init.php";
	
	if(!isset($_POST["bulkDisableDate"]) || $_SESSION["type"] != "admin"){
		header("Location: manage_evaluations.php?success=false");
	}
	
	$date = $_POST["bulkDisableDate"];
	$archiveDate = date("Y-m-d H:i:s");
	
	$success = "false";
	
	if($stmt = $mysqli->prepare("update requests set status='archived', archiveDate=? where completeDate<? and status='complete'")){
		if($stmt->bind_param("ss", $archiveDate, $date)){
			if($stmt->execute()){
				$success = "true";
			}
		}
	}
	
	header("Location: manage_evaluations.php?success={$success}");
?>
