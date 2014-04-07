<?php
	session_start();
	require "init.php";
	
	if(!isset($_POST["formTitle"]) || $_SESSION["type"] !== "admin"){
		header("Location: form_builder.php");
	}
	
	$formLocation = "evaluation_forms/".uniqid().".xml";
	
	$form = new SimpleXmlElement("<form></form>");
	
	$questionName = "";
	
	foreach ($_POST as $key => $value){
		
		$questionName = substr($key, 0, strpos($key, ":"));
		if(strpos($key, "name") !== false){
			$question = $form->addChild("question");
			$question->addAttribute("name", $questionName);
			$question->addChild("text", $value);
		}
		else if(strpos($key, "type") !== false){
			$question->addAttribute("type", $value);
		}
		else if(strpos($key, "milestone") !== false){
			$milestones[$questionName] = $value;
		}
		else if(strpos($key, "competency") !== false){
			$competencies[$questionName] = $value;
		}
		else if($key == "formTitle"){
			$form->addChild("title", $value);
			$formTitle = $value;
		}
		else{
			$optionValue = substr($key, strpos($key, ":")+1);
			$option = $question->addChild("option", $value);
			$option->addAttribute("value", $optionValue);
			
		}
	}
	$form->asXML($formLocation);
	$formTitle = $mysqli->escape_string($formTitle);
	if($stmt = $mysqli->prepare("insert into `forms` (`title`, `location`) values (?, ?);")){
		$stmt->bind_param("ss", $formTitle, $formLocation);
		$stmt->execute();
		$stmt->close();
		
		$formId = $mysqli->insert_id;
		
		$mysqli->query("create table `responsesForm{$formId}` select * from `responses` where 1=2;");
		$mysqli->query("create table `textResponsesForm{$formId}` select * from `textResponses` where 1=2;");
		
		if($mysqli->query("create table `milestonesForm{$formId}` select * from `milestonesForm` where 1=2;")){
			if($stmt = $mysqli->prepare("insert into `milestonesForm{$formId}`(questionId, milestoneId) values (?, ?)")){
				if($stmt->bind_param("si", $questionId, $milestoneId)){
					foreach($milestones as $questionId => $milestoneId){
						$questionId = $mysqli->escape_string($questionId);
						$milestoneId = $mysqli->escape_string($milestoneId);
						$stmt->execute();
					}
				}
				$stmt->close();				
			}
		}	
		
		if($mysqli->query("create table `competenciesForm{$formId}` select * from `competenciesForm` where 1=2;")){
			if($stmt = $mysqli->prepare("insert into `competenciesForm{$formId}`(questionId, competencyId) values (?, ?)")){
				if($stmt->bind_param("si", $questionId, $competencyId)){
					foreach($competencies as $questionId => $competencyId){
						$questionId = $mysqli->escape_string($questionId);
						$competencyId = $mysqli->escape_string($competencyId);
						$stmt->execute();
					}
				}
				$stmt->close();
			}
		}
	}
	
	
	header("Location: form_builder.php");
?>
