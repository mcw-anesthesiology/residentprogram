<?php
	
	$questionType = "";
	$questionName = "";
	$questionWeight = "";
	
	function startElement($parser, $name, $attrs){
		
		global $questionType, $questionName;
				
		if($name == "question"){
			echo "<table class='table table-striped'>";
			$questionType = $attrs["type"];
			$questionName = $attrs["name"];
			$questionWeight = $attrs["weight"];
			echo "<input type='hidden' name='{$questionName}:weight' value='{$questionWeight}'";
			
		}
		else if($name == "option"){
			if($questionType == "radio"){
				if(isset($attrs["description"]))
					$description = $attrs["description"];
				else
					$description = "";
				echo "<td class='tdRdoBtn'><label><span title='{$description}'><input type='radio' name='{$questionName}' value='{$attrs["value"]}' required /><br />";
			}
		}
		else if($name == "text"){
			echo "<tr><td colspan='10'><b>".strtoupper($questionName).": </b>"; 
		}
		else if($name == "form"){
			
		}
		else if($name == "title"){
			echo "<h3>";
		}
		
	}
	
	function endElement($parser, $name){
		
		global $questionType, $questionName;
		
		if($name == "form"){
			
		}
		else if($name == "question"){
			
			if($questionType == "text"){
				echo "<td><textarea name='{$questionName}' required></textarea></td>";
			}
			
			echo "</tr></tbody></table>";
		}
		else if($name == "option"){
			echo "</span></label></td>";
		}
		else if($name == "text"){
			echo "</td></tr><tr>";
		}
		else if($name == "title"){
			echo "</h3>";
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
