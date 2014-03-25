<?php

	$form = $mysqli->query("select location from forms where formId='{$formId}'")->fetch_assoc();
	$formLocation = $form["location"];
	
	$questionType = "";
	$questionName = "";
	
	function startElement($parser, $name, $attrs){
		
		global $questionType, $questionName;
				
		if($name == "question"){
			echo "<table class='table table-striped'>";
			$questionType = $attrs["type"];
			$questionName = $attrs["name"];
			
		}
		else if($name == "option"){
			if($questionType == "radio"){
				echo "<td class='tdRdoBtn'><label><input type='radio' name='{$questionName}' value='{$attrs["value"]}' /><br />";
			}
		}
		else if($name == "text"){
			echo "<tr><td colspan='10'><b>".strtoupper($questionName).": </b>"; 
		}
		else if($name == "form"){
			
		}
		
	}
	
	function endElement($parser, $name){
		
		global $questionType, $questionName;
		
		if($name == "form"){
			
		}
		else if($name == "question"){
			
			if($questionType == "text"){
				echo "<td><textarea name='{$questionName}'></textarea></td>";
			}
			
			echo "</tr></tbody></table>";
		}
		else if($name == "option"){
			echo "</label></td>";
		}
		else if($name == "text"){
			echo "</td></tr><tr>";
		}
		
	}
	
	function characterData($parser, $data){
		echo $data;
	}
	
	$formParser = xml_parser_create();
	xml_parser_set_option($formParser, XML_OPTION_CASE_FOLDING, false);
	xml_set_element_handler($formParser, "startElement", "endElement");
	xml_set_character_data_handler($formParser, "characterData");
	if(!($fp = fopen($formLocation, "r"))){
		die("could not open XMl input");
	}
	
	while($data = fread($fp, 4096)){
		if(!xml_parse($formParser, $data, feof($fp))){
			die(sprintf("XML error: %s at line %d", xml_error_string(xml_get_error_code($formParser)), xml_get_current_line_number($formParser)));
		}
	}
	xml_parser_free($formParser);
	
?>
