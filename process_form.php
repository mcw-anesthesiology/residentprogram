<?php
	session_start();
	require "init.php";
	
	if(!isset($_POST["formTitle"])){
		header("Location: form_builder.php");
	}
	
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
			$form->addChild("text", $value);
		}
		else{
			$optionValue = substr($key, strpos($key, ":")+1);
			$option = $question->addChild("option", $value);
			$option->addAttribute("value", $optionValue);
			
		}
	}
	
	$xml = $form->asXML();
	$xml = str_replace("&", "&amp;", $xml);
	$xml = str_replace("<", "&lt;", $xml);
	$xml = str_replace(">", "&gt;", $xml);
	echo "<p>".$xml."</p>";
?>
