<?php
	session_start();
	require "init.php";
	
	$milestoneId = $mysqli->escape_string($_POST["milestoneId"]);
	$milestoneTitle = $mysqli->escape_string($_POST["milestoneTitle"]);
	$milestoneDescription = $mysqli->escape_string($_POST["milestoneDescription"]);
	
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_milestones_competencies.php");
	}

	if($stmt = $mysqli->prepare("update `milestones` set title=?, description=? where milestoneId=?;")){
		$stmt->bind_param("ssi", $milestoneTitle, $milestoneDescription, $milestoneId);
		$stmt->execute();
	}
	header("Location: manage_milestones_competencies.php");
?>
