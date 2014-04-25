<?php
	session_start();
	require "init.php";
	
	if($_SESSION["type"] !== "admin"){
		header("Location: index.php");
	}
	
	$success = "false";
	
	if(isset($_POST["mentorshipId"])){
		$mentorshipId = $_POST["mentorshipId"];
		$status = "inactive";
		if($stmt = $mysqli->prepare("update mentorships set status=? where mentorshipId=?;")){ 
			if($stmt->bind_param("ss", $status, $mentorshipId))
				if($stmt->execute())
					$success = "true";
		}
	}
	else if(isset($_POST["resident"]) && isset($_POST["faculty"])){
		$resident = $_POST["resident"];
		$faculty = $_POST["faculty"];
		$createdDate = date("Y-m-d H:i:s");
		$status = "active";
		if($stmt = $mysqli->prepare("insert into mentorships (resident, faculty, createdDate, status) values (?, ?, ?, ?);")){
			if($stmt->bind_param("ssss", $resident, $faculty, $createdDate, $status))
				if($stmt->execute())
					$success = "true";
		}
	}

	header("Location: manage_mentors.php?success={$success}");
?>
