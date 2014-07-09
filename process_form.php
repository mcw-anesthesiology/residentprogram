<?php
	//This page creates an XML file to be used to store an evaluation form. It is called by form_builder.php and returns to manage_forms.php afterward. 
error_reporting(-1);
	//TODO: Server side error checking to make sure all corresponding fields are submitted
	session_start();
	require "init.php";
	
	if(!isset($_POST["formTitle"]) || $_SESSION["type"] !== "admin"){
		header("Location: form_builder.php");
	}
	$formLocation = "evaluation_forms/".uniqid().".xml"; //creates new unique filename for the form
	
	$form = new SimpleXmlElement("<form></form>");
	
	$questionName = "";
	
	foreach ($_POST as $key => $value){
		//$value = htmlspecialchars($value);
		//$key = htmlspecialchars($key);
		
		$questionName = substr($key, 0, strpos($key, ":"));
		if(strpos($key, "name") !== false){
			$question = $form->addChild("question");
			$question->addAttribute("name", $questionName);
			$question->addChild("text", htmlspecialchars($value));
		}
		else if(strpos($key, "type") !== false){
			$question->addAttribute("type", $value);
		}
		else if(strpos($key, "required") !== false){
			if($value == "required")
				$question->addAttribute("required", "required");
		}
		else if(strpos($key, "milestone") !== false){
			if(strpos($key, "milestone2") !== false){
				if($value != -1 && isset($milestones[$questionName]) && $milestones[$questionName] !== $value) //don't add second milestone if it isn't set or if it's the same as the first
					$milestones2[$questionName] = $value;
			}
			else{
				$milestones[$questionName] = $value;
			}
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
			$form->addChild("title", htmlspecialchars($value));
			$formTitle = $value;
		}
		else{
			$optionValue = substr($key, strpos($key, ":")+1);
			$optionValue = substr($optionValue, 0, strpos($optionValue, ":"));
			$option = $question->addChild("option", htmlspecialchars($value));
			$option->addAttribute("value", $optionValue);
			
		}
	}
	
	$dom = new DOMDocument('1.0');
	$dom->preserveWhiteSpace = false;
	$dom->formatOuput = true;
	$dom->loadXML($form->asXML());
	$dom->save($formLocation);
	//$form->asXML($formLocation);
	$formTitle = $formTitle;
	$formStatus = "active";
	$createdDate = date("Y-m-d H:i:s");
	
	//Inserts form title, location, status, and createdDate into table forms
	if($stmt = $mysqli->prepare("insert into `forms` (`title`, `location`, `status`, `createdDate`) values (?, ?, ?, ?);")){
		//print "In here.";
		$stmt->bind_param("ssss", $formTitle, $formLocation, $formStatus, $createdDate);
		$stmt->execute();
		$stmt->close();
		
		$formId = $mysqli->insert_id;
		
		//Inserts milestone-question mapping into milestones_questions table
		if($stmt = $mysqli->prepare("insert into `milestones_questions`(formId, questionId, milestoneId) values (?, ?, ?)")){
			if($stmt->bind_param("isi", $formId, $questionId, $milestoneId)){
				foreach($milestones as $questionId => $milestoneId){
					$questionId = $questionId;
					$milestoneId = $milestoneId;
					$stmt->execute();
				}
				foreach($milestones2 as $questionId => $milestoneId){
					$questionId = $questionId;
					$milestoneId = $milestoneId;
					$stmt->execute();
				}
			}
			$stmt->close();				
		}
		
		//Inserts competency-question mapping into competencies_questions
		if($stmt = $mysqli->prepare("insert into `competencies_questions`(formId, questionId, competencyId) values (?, ?, ?)")){
			if($stmt->bind_param("isi", $formId, $questionId, $competencyId)){
				foreach($competencies as $questionId => $competencyId){
					$questionId = $questionId;
					$competencyId = $competencyId;
					$stmt->execute();
				}
			}
			$stmt->close();
		}
	}
	
	
	header("Location: manage_forms.php");
?>
