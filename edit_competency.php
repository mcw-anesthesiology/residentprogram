<?php
	session_start();
	require "init.php";
	
	$competencyId = $mysqli->escape_string($_POST["competencyId"]);
	$competencyTitle = $mysqli->escape_string($_POST["competencyTitle"]);
	$competencyDescription = $mysqli->escape_string($_POST["competencyDescription"]);
	
	
	foreach($_POST as $value){
		if($value == "")
			header("Location: manage_milestones_competencies.php");
	}

	if($stmt = $mysqli->prepare("update `competencies` set title=?, description=? where competencyId=?;")){
		$stmt->bind_param("ssi", $competencyTitle, $competencyDescription, $competencyId);
		$stmt->execute();
	}
	header("Location: manage_milestones_competencies.php");
?>
