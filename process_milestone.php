<?php
	session_start();
	require "init.php";
	
	if(isset($_POST["milestoneTitle"]) && isset($_POST["milestoneDescription"])){
		if($stmt = $mysqli->prepare("insert into `milestones`(title, description) values (?, ?);")){
			$stmt->bind_param("ss", $mysqli->escape_string($_POST["milestoneTitle"]), $mysqli->escape_string($_POST["milestoneDescription"]));
			$stmt->execute();
		}
	}
	
	header("Location: manage_evaluations.php");

?>
