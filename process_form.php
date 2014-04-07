<?php
	//TODO: Client side error checking to make sure all corresponding fields are submitted
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
		else if(strpos($key, "weight") !== false){
			$question->addAttribute("weight", $value);
		}
		else if(strpos($key, "description") !== false){
			$option->addAttribute("description", $value);
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
		
		$mysqli->query("create table `responsesForm{$formId}`(requestId int not null, questionId varchar(255) not null, response int not null, weight int not null, primary key(requestId, questionId), foreign key(requestId) references requests(requestId));");
		$mysqli->query("create table `textResponsesForm{$formId}`(requestId int not null, questionId varchar(255) not null, response text not null, primary key(requestId, questionId), foreign key(requestId) references requests(requestId));");
		
		if($mysqli->query("create table `milestonesForm{$formId}`(`questionId` varchar(255) not null, `milestoneId` int not null, primary key(questionId, milestoneId), foreign key(milestoneId) references `milestones`(milestoneId));")){
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
		
		if($mysqli->query("create table `competenciesForm{$formId}`(`questionId` varchar(255) not null, `competencyId` int not null, primary key(questionId, competencyId), foreign key(competencyId) references `competencies`(competencyId));")){
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
	
	
	header("Location: manage_evaluations.php");
?>
