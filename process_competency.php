<?php
	//This page adds a new competency into the system. It is called by manage_milestones_competencies.php and returns there afterward with a GET success value ("true" or "false")

	session_start();
	require "init.php";
	
	$success = false;
	
	if(isset($_POST["competencyTitle"]) && isset($_POST["competencyDescription"])){
		if($stmt = $mysqli->prepare("insert into `competencies`(title, description) values (?, ?);")){
			if($stmt->bind_param("ss", $_POST["competencyTitle"], $_POST["competencyDescription"])){
				if($stmt->execute()){
					$success = "true";
				}
			}
		}
	}
	
	header("Location: manage_milestones_competencies.php?competency={$success}");

?>
