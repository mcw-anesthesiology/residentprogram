<?php
	session_start();
	require "init.php";
	
	$milestoneId = $mysqli->escape_string($_POST["milestoneId"]);
	$milestoneTitle = $mysqli->escape_string($_POST["milestoneTitle"]);
	$milestoneDescription = $mysqli->escape_string($_POST["milestoneDescription"]);
	
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
