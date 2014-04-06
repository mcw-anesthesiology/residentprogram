<?php
	session_start();
	require "init.php";
	
	if(isset($_POST["competencyTitle"]) && isset($_POST["competencyDescription"])){
		if($stmt = $mysqli->prepare("insert into `competencies`(title, description) values (?, ?);")){
			$stmt->bind_param("ss", $mysqli->escape_string($_POST["competencyTitle"]), $mysqli->escape_string($_POST["competencyDescription"]));
			$stmt->execute();
		}
	}
	
	header("Location: manage_evaluations.php");

?>
