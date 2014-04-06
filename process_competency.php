<?php
	session_start();
	require "init.php";
	
	if(isset($_POST["title"]) && isset($_POST["description"])){
		if($stmt = $mysqli->prepare("insert into `competencies`(title, description) values (?, ?);")){
			$stmt->bind_param("ss", $mysqli->escape_string($_POST["title"]), $mysqli->escape_string($_POST["description"]));
			$stmt->execute();
		}
	}
	
	header("Location: manage_evaluations.php");

?>
