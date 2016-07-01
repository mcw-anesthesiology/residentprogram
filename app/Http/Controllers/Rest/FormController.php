<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use DOMDocument;
use SimpleXmlElement;

use App\Form;
use App\CompetencyQuestion;
use App\MilestoneQuestion;

class FormController extends RestController
{

	protected $relationships = [
		"evaluations",
		"milestones",
		"competencies",
		"watchedForms"
	];

	protected $attributes = [
		"id",
		"type",
		"evaluator_type",
		"visibility"
	];

	protected $model = \App\Form::class;

	public function store(Request $request){
		// TODO This should be reviewed

		$formLocation = "evaluation_forms/".uniqid().".xml"; //creates new unique filename for the form

    	$form = new SimpleXmlElement("<form></form>");

    	$questionName = "";

        $input = $request->all();

    	foreach ($input as $key => $value){
            if($key == "_token")
                continue;
            if($key == "form_type"){
                $formType = $value;
                continue;
            }
            if($key == "formTitle"){
    			$form->addChild("title", htmlspecialchars($value));
    			$formTitle = $value;
                continue;
    		}


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
    			if(!is_array($value))
					$value = [$value];
				foreach($value as $val){
					$milestones[$questionName][] = $val;
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
            else if(strpos($key, "instruction") !== false){
                $form->addChild("instruction", htmlspecialchars($value));
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
    	$dom->save(storage_path("app")."/".$formLocation);
    	$formStatus = "active";
    	$createdDate = date("Y-m-d H:i:s");

        $newForm = new Form();
        $newForm->title = $formTitle;

        switch($formType){
            case "self-resident":
                $newForm->type = "resident";
                $newForm->evaluator_type = "self";
                $newForm->visibility = "visible";
                break;
            case "self-fellow":
                $newForm->type = "fellow";
                $newForm->evaluator_type = "self";
                $newForm->visibility = "visible";
                break;
            case "faculty":
                $newForm->type = "faculty";
                $newForm->evaluator_type = "resident";
                $newForm->visibility = "anonymous";
                break;
            case "staff":
                $newForm->type = "resident";
                $newForm->evaluator_type = "staff";
                $newForm->visibility = "hidden";
                break;
            case "fellow":
                $newForm->type = "fellow";
                $newForm->evaluator_type = "faculty";
                $newForm->visibility = "visible";
                break;
            case "resident":
            default:
                $newForm->type = "resident";
                $newForm->evaluator_type = "faculty";
                $newForm->visibility = "visible";
                break;
        }


        $newForm->xml_path = $formLocation;
        $newForm->status = $formStatus;
        $newForm->save();

        if(in_array($formType, ["resident", "fellow"])){
            if(isset($milestones)){
                foreach($milestones as $questionId => $milestoneIds){
					foreach($milestoneIds as $milestoneId){
						$mq = new MilestoneQuestion();
						$mq->form_id = $newForm->id;
						$mq->question_id = $questionId;
						$mq->milestone_id = $milestoneId;
						$mq->save();
					}
                }
            }

            if(isset($competencies)){
                foreach($competencies as $questionId => $milestoneId){
                    $cq = new CompetencyQuestion();
                    $cq->form_id = $newForm->id;
                    $cq->question_id = $questionId;
                    $cq->competency_id = $milestoneId;
                    $cq->save();
                }
            }
        }

        return redirect("manage/forms");
	}
}
