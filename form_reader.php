<?php

	echo "<html><body>"; //only for testing purposes
	$form = "evaluation_forms/eval1.xml"; //only for testing purposes
	
	$questionType = "";
	$questionName = "";
	
	function startElement($parser, $name, $attrs){
		
		global $questionType, $questionName;
				
		if($name == "question"){
			echo "<tr>";
			$questionType = $attrs["type"];
			$questionName = $attrs["name"];
			
		}
		else if($name == "option"){
			if($questionType == "radio"){
				echo "<td><input type='radio' name='{$questionName}' value='{$attrs["value"]}' />";
			}
		}
		else if($name == "text"){
			echo "<td>";
		}
		else if($name == "form"){
			echo "<form method='post' action='process_completion.php'><table class='table table-striped'>";
		}
		
	}
	
	function endElement($parser, $name){
		
		global $questionType, $questionName;
		
		if($name == "form"){
			echo "</table></form>";
		}
		else if($name == "question"){
			
			if($questionType == "text"){
				echo "<td><textarea name='{$questionName}'></textarea></td>";
			}
			
			echo "</tr>";
		}
		else if($name == "option"){
			echo "</td>";
		}
		else if($name == "text"){
			echo "</td>";
		}
		
	}
	
	function characterData($parser, $data){
		echo $data;
	}
	
	$formParser = xml_parser_create();
	xml_parser_set_option($formParser, XML_OPTION_CASE_FOLDING, false);
	xml_set_element_handler($formParser, "startElement", "endElement");
	xml_set_character_data_handler($formParser, "characterData");
	if(!($fp = fopen($form, "r"))){
		die("could not open XMl input");
	}
	
	while($data = fread($fp, 4096)){
		if(!xml_parse($formParser, $data, feof($fp))){
			die(sprintf("XML error: %s at line %d", xml_error_string(xml_get_error_code($formParser)), xml_get_current_line_number($formParser)));
		}
	}
	xml_parser_free($formParser);
	
	echo "</body></html>"; //only for testing purposes
?>
