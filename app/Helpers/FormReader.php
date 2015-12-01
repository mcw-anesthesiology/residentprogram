<?php

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
			$result .= "<div class='question'>";
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
			if(in_array($questionType, ["radio", "radionumeric"])){
				if(isset($attrs["description"]))
					$description = htmlspecialchars($attrs["description"], ENT_QUOTES);
				else
					$description = "";

				if($description != "")
					$questionHasDescriptions = true;

				$result .= "<div class='tdRdoBtn question-option'><label><span title='{$description}'><input type='radio' name='{$questionName}' value='{$attrs["value"]}' {$required} /><br />";
			}
		}
		else if($name == "text"){
			if($required == "required")
				$result .= "<div class='question-header'><div class='question-title'><b style='color: red;'>".strtoupper($questionName)."*: </b>";
			else
				$result .= "<div class='question-header'><div class='question-title'><b>".strtoupper($questionName).": </b>";
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
				$result .= "<div class='question-option'><textarea name='{$questionName}' {$required}></textarea></div>";
			}
			elseif($questionType == "number"){
				$result .= "<div class='question-option'><input type='number' name='{$questionName}' {$required} /></div>";
			}
			else if(in_array($questionType, ["radio", "radionumeric"])){
				if($questionHasDescriptions){
					$result .= "<div class='question-footer'><div class='question-description-toggle'>";
					$result .= "<button type='button' class='toggleDescriptions btn btn-info' data-id='{$questionName}'>Show Descriptions</button>";
					$result .= "</div></div>"; // .question-description-toggle, .question-footer
				}
			}

			$result .= "</div></div>";
		}
		else if($name == "option"){
			$result .= "</span></label>";
			if($description != "")
				$result .= "<br/><label><div class='description {$questionName} collapse'>{$description}</div></label>";
			$result .= "</div>"; // .question-option
		}
		else if($name == "text"){
			$result .= "</div></div><div class='question-body'>"; // .question-title
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
