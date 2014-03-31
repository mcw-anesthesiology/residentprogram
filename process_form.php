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
	
	$mysqli->query("insert into `forms` (`title`, `location`) values ('{$formTitle}', '{$formLocation}');");
	$formId = $mysqli->insert_id;
	
	$mysqli->query("create table `responsesForm{$formId}` select * from `responses` where 1=2;");
	$mysqli->query("create table `textResponsesForm{$formId}` select * from `textResponses` where 1=2;");
	
	header("Location: dashboard.php");
?>
