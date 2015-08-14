<?php

//This page reads the XML file at $fileLocation and converts it to XML to be displayed to the user on either view_specific.php or complete_specific.php, which sets $fileLocation prior to calling this page.
namespace App\Helpers;

class FormReader{

	protected $questionType = "";
	protected $questionName = "";
	protected $questionWeight = "";
	protected $description = "";
	protected $required = "";
	protected $questionHasDescriptions = false;
	protected $result = "";

	static function startElement($parser, $name, $attrs){

		global $questionType, $questionName, $description, $questionHasDescriptions, $required, $result;

		if($name == "question"){
			$result .= "<table class='table table-striped'>";
			$questionType = $attrs["type"];
			$questionName = $attrs["name"];
			$questionWeight = $attrs["weight"];
			if(isset($attrs["required"]))
				$required = "required";
			else
				$required = "";
			$questionHasDescriptions = false;
			$result .= "<input type='hidden' name='{$questionName}:weight' value='{$questionWeight}' />";

		}
		else if($name == "option"){
			if($questionType == "radio"){
				if(isset($attrs["description"]))
					$description = htmlspecialchars($attrs["description"], ENT_QUOTES);
				else
					$description = "";

				if($description != "")
					$questionHasDescriptions = true;

				$result .= "<td class='tdRdoBtn'><label><span title='{$description}'><input type='radio' name='{$questionName}' value='{$attrs["value"]}' {$required} /><br />";
			}
		}
		else if($name == "text"){
			if($required == "required")
				$result .= "<tr><td colspan='50'><b style='color: red;'>".strtoupper($questionName)."*: </b>";
			else
				$result .= "<tr><td colspan='50'><b>".strtoupper($questionName).": </b>";
		}
		else if($name == "form"){

		}
		else if($name == "title"){
			$result .= "<h3>";
		}

	}

	static function endElement($parser, $name){

		global $questionType, $questionName, $description, $questionHasDescriptions, $required, $result;

		if($name == "form"){

		}
		else if($name == "question"){

			if($questionType == "text"){
				$result .= "<td><textarea name='{$questionName}' {$required}></textarea></td>";
			}
			elseif($questionType == "number"){
				$result .= "<td><input type='number' name='{$questionName}' {$required} /></td>";
			}
			else if($questionType == "radio"){
				if($questionHasDescriptions){
					$result .= "<tr></tr><tr><td colspan='50' style='text-align:center;'>";
					$result .= "<button type='button' class='toggleDescriptions btn btn-info' data-id='{$questionName}'>Show Descriptions</button>";
					$result .= "</td></tr>";
				}
			}

			$result .= "</tr></tbody></table>";
		}
		else if($name == "option"){
			$result .= "</span></label>";
			if($description != "")
				$result .= "<br/><label><div class='description {$questionName}' hidden>{$description}</div></label>";
			$result .= "</td>";
		}
		else if($name == "text"){
			$result .= "</td></tr><tr>";
		}
		else if($name == "title"){
			$result .= "</h3>";
		}

	}

	static function characterData($parser, $data){
		global $result;

		$result .= $data;
	}

	static function read($formPath){
		global $questionType, $questionName, $questionWeight, $description, $required, $questionHasDescriptions, $result;
		$questionType = "";
		$questionName = "";
		$questionWeight = "";
		$description = "";
		$required = "";
		$questionHasDescriptions = false;
		$result = "";

		$formLocation = storage_path("app/".$formPath);
		$formParser = xml_parser_create();
		xml_parser_set_option($formParser, XML_OPTION_CASE_FOLDING, false);
		xml_set_element_handler($formParser, array("App\Helpers\FormReader", "startElement"), array("App\Helpers\FormReader", "endElement"));
		xml_set_character_data_handler($formParser, array("App\Helpers\FormReader", "characterData"));
		if(!($fp = fopen($formLocation, "r"))){
			die("could not open XML input");
		}

		while($data = fread($fp, 4096)){
			if(!xml_parse($formParser, $data, feof($fp))){
				die(sprintf("XML error: %s at line %d", xml_error_string(xml_get_error_code($formParser)), xml_get_current_line_number($formParser)));
			}
		}
		xml_parser_free($formParser);
		return $result;
	}

}
