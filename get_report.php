<?php
	session_start();
	
	include "init.php";
	include "reporting.php";

	$startDate = "";
	$endDate = "";
	$username = "";
	$trainingLevel = "";

	if(isset($_POST["startDate"]))
		$startDate = $_POST["startDate"];
	if(isset($_POST["endDate"]))
		$endDate = $_POST["endDate"];
	if(isset($_POST["username"]))
		$username = $_POST["username"];
	if(isset($_POST["trainingLevel"]))
		$trainingLevel = $_POST["trainingLevel"];

	$result = "";

	if($username != "all"){
		if($stmt = $mysqli->prepare("select firstName, lastName, trainingLevel, createdDate, username from users where username=?")){
			if($stmt->bind_param("s", $username)){
				if($stmt->execute()){
					$stmt->bind_result($firstName, $lastName, $currentTrainingLevel, $createdDate, $dbUsername);
					$stmt->fetch();
					$stmt->closes();
				} else {
					print $stmt->error;
				}
			}
		}

		$result .= "<table class='table'>";
		$result .= "<thead><tr><th>Username</th><th>First Name</th><th>Last Name</th><th>Current Training Level</th><th>Created</th></tr></thead>";
		$result .= "<tbody><tr><td>{$dbUsername}</td><td>{$firstName}</td><td>{$lastName}</td><td>{$currentTrainingLevel}</td><td>{$createdDate}</td></tr></tbody>";
		$result .= "</table>";

	}

	
	$result .= "<div style='text-align:center;'>";
	$result .= drawIndividualGraphs($username, $trainingLevel, $startDate, $endDate);
	$result .= "</div>";
	$result .= writeTextResponses($username, $trainingLevel, $startDate, $endDate);

	echo $result;
?>
