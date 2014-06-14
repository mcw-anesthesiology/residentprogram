<?php
	session_start();
	require "init.php";
	
	$competencyId = $mysqli->escape_string($_POST["competencyId"]);
	
	$numCompetenciesQuestions = $mysqli->query("select * from competencies_questions where competencyId='{$competencyId}';")->num_rows;
	
	$success = "false";
	
	if($numCompetenciesQuestions === 0){
		if($stmt = $mysqli->prepare("delete from competencies where competencyId=?;")){
			if($stmt->bind_param("s", $competencyId)){
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
