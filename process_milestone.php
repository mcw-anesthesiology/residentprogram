<?php
	//This page adds a new milestone to the system. It is called by manage_milestones_competencies.php and returns there afterward with a success GET attribute ("true" or "false")

	session_start();
	require "init.php";
	
	$success = "false";
	
	if(isset($_POST["milestoneTitle"]) && isset($_POST["milestoneDescription"])){
		if($stmt = $mysqli->prepare("insert into `milestones`(title, description) values (?, ?);")){
			if($stmt->bind_param("ss", $_POST["milestoneTitle"], $_POST["milestoneDescription"]))
				if($stmt->execute())
					$success = "true";
		}
	}
	
	header("Location: manage_milestones_competencies.php?success={$success}");

?>
