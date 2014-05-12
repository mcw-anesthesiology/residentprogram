<?php
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
