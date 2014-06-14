<?php
	//This page edits a specified milestone with the values it receives from the edit milestone modal that calls it on manage_milestones_competencies.php, where it returns afterwards with a success value ("true" or "false")
	session_start();
	require "init.php";
	
	$milestoneId = $_POST["milestoneId"];
	$milestoneTitle = $_POST["milestoneTitle"];
	$milestoneDescription = $_POST["milestoneDescription"];
	
	$success = "false";
	
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_milestones_competencies.php");
	}

	if($stmt = $mysqli->prepare("update `milestones` set title=?, description=? where milestoneId=?;")){
		if($stmt->bind_param("ssi", $milestoneTitle, $milestoneDescription, $milestoneId)){
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
	header("Location: manage_milestones_competencies.php?success={$success}");
?>
