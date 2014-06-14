<?php
	session_start();
	require "init.php";
	
	$milestoneId = $mysqli->escape_string($_POST["milestoneId"]);
	
	$numMilestonesQuestions = $mysqli->query("select * from milestones_questions where milestoneId='{$milestoneId}';")->num_rows;
	
	$success = "false";
	
	if($numMilestonesQuestions === 0){
		if($stmt = $mysqli->prepare("delete from milestones where milestoneId=?;")){
			if($stmt->bind_param("i", $milestoneId)){
				if($stmt->execute()){
					$success = "true";
				}
				else{
					$stmt->error;
				}
			}
			else{
				print $stmt->error;
			}
		}
		else{
			print $mysqli->error;
		}
	}
	
	header("Location: manage_milestones_competencies.php?success={$success}");
?>
