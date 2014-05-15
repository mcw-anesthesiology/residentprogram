<?php
	//This page edits a specified competency with the values it receives from the edit competency modal that calls it on manage_milestones_competencies.php, where it returns afterwards with a success value ("true" or "false")
	session_start();
	require "init.php";
	
	$competencyId = $mysqli->escape_string($_POST["competencyId"]);
	$competencyTitle = $mysqli->escape_string($_POST["competencyTitle"]);
	$competencyDescription = $mysqli->escape_string($_POST["competencyDescription"]);
	
	$success = "false";
	
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_milestones_competencies.php");
	}

	if($stmt = $mysqli->prepare("update `competencies` set title=?, description=? where competencyId=?;")){
		if($stmt->bind_param("ssi", $competencyTitle, $competencyDescription, $competencyId)){
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
