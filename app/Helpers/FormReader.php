<?php

namespace App\Helpers;

use \Michelf\Markdown;

class FormReader{

	protected $questionType = "";
	protected $questionName = "";
	protected $questionWeight = "";
	protected $description = "";
	protected $required = "";
	protected $questionHasDescriptions = false;
	protected $result = "";
	protected $characterData = "";
	protected $transformCharacterData = false;

	static function startElement($parser, $name, $attrs){
		global $questionType, $questionName, $description, $questionHasDescriptions, $required, $result, $characterData, $transformCharacterData;

		$characterData = "";

		if($name == "question"){
			$questionType = $attrs["type"];
			$questionName = $attrs["name"];
			$questionWeight = $attrs["weight"];
			if(isset($attrs["required"]))
				$panelType = "panel-primary";
			else
				$panelType = "panel-default";
			$result .= "<div class='question panel {$panelType}' id='{$questionName}'>";
			$questionHasDescriptions = false;
			$result .= "<input type='hidden' name='{$questionName}:weight' value='{$questionWeight}' />";

		}
		elseif($name == "option"){
			if(in_array($questionType, ["radio", "radiononnumeric"])){
				if(isset($attrs["description"]))
					$description = htmlspecialchars($attrs["description"], ENT_QUOTES);
				else
					$description = "";

				if($description != "")
					$questionHasDescriptions = true;

				$result .= "<div class='question-option {$questionName}'><label><span title='{$description}'><input type='radio' name='{$questionName}' value='{$attrs["value"]}' {$required} /><br />";
			}
		}
		elseif($name == "text"){
				$result .= "<div class='question-header panel-heading'><div class='question-title panel-title'><b>".strtoupper($questionName).": </b>";
		}
		elseif($name == "form"){

		}
		elseif($name == "title"){
			$result .= "<h2 class='heading'>";
		}
		elseif($name == "instruction"){
			$transformCharacterData = true;
			$result .= "<div class='instruction'>";
		}

	}

	static function endElement($parser, $name){
		global $questionType, $questionName, $description, $questionHasDescriptions, $required, $result, $characterData, $transformCharacterData;

		if($characterData){
			if($transformCharacterData)
				$result .= Markdown::defaultTransform($characterData);
			else
				$result .= $characterData;

			$characterData = "";
			$transformCharacterData = false;
		}

		if($name == "form"){

		}
		else if($name == "question"){

			if($questionType == "text"){
				$result .= "<div class='question-option {$questionName}'><textarea class='form-control' name='{$questionName}' {$required}></textarea></div>";
			}
			elseif($questionType == "number"){
				$result .= "<div class='question-option {$questionName}'><input type='number' class='form-control' name='{$questionName}' {$required} /></div>";
			}
			elseif(in_array($questionType, ["radio", "radiononnumeric"])){
				if($questionHasDescriptions){
					$result .= "</div><div class='question-footer panel-footer'><div class='question-description-toggle'>";
					$result .= "<button type='button' class='toggle-descriptions btn btn-info' data-id='{$questionName}'><span class='glyphicon glyphicon-zoom-in'></span> Show descriptions</button>";
					$result .= "</div>"; // .question-description-toggle, .question-footer
				}
			}

			$result .= "</div></div>";
		}
		elseif($name == "option"){
			$result .= "</span></label>";
			if($description != "")
				$result .= "<div class='description well collapse'>" . nl2br($description) . "</div>";
			$result .= "</div>"; // .question-option
		}
		elseif($name == "text"){
			$result .= "</div></div><div class='question-body panel-body'>"; // .question-title
		}
		elseif($name == "title"){
			$result .= "</h2>";
		}
		elseif($name == "instruction"){
			$result .= "</div>"; // .instruction
		}

	}

	static function characterData($parser, $data){
		global $result, $characterData;

		$characterData .= $data == "" ? "&nbsp;" : $data;
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
