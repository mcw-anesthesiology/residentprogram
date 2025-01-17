<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use DOMDocument;
use SimpleXMLElement;

use Debugbar;

use App\Form;
use App\CompetencyQuestion;
use App\MilestoneQuestion;

class FormController extends RestController
{
	public function __construct() {
		$this->middleware('auth');
		$this->middleware('type:admin')->except(['index']);
	}

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

	protected $revealable = [
		'contents'
	];

	protected $model = \App\Form::class;

	public function store(Request $request){
		if(!$request->has('title'))
			throw new \Exception('No title');

		if(!$request->has('formType'))
			throw new \Exception('No form type');

		if(!$request->has('items') || count($request->input('items')) == 0)
			throw new \Exception('No items');

		$form = new Form();
		$form->xml_path = "evaluation_forms/".uniqid().".xml"; //creates new unique filename for the form
		$form->status = 'active';
		$form->title = $request->input('title');
		$form->evaluation_period_type = $request->input('evaluation_period_type', 'month');

		switch($request->input('formType')){
		case "self-resident":
			$form->type = "resident";
			$form->evaluator_type = "self";
			$form->visibility = "visible";
			break;
		case "self-fellow":
			$form->type = "fellow";
			$form->evaluator_type = "self";
			$form->visibility = "visible";
			break;
		case "faculty":
			$form->type = "faculty";
			$form->evaluator_type = "resident";
			$form->visibility = "anonymous";
			break;
		case "staff":
			$form->type = "resident";
			$form->evaluator_type = "staff";
			$form->visibility = "hidden";
			break;
		case "fellow":
			$form->type = "fellow";
			$form->evaluator_type = "faculty";
			$form->visibility = "visible";
			break;
		case 'app':
			$form->type = 'app';
			$form->evaluator_type = 'faculty';
			$form->visibility = 'visible';
			break;
		case 'trainee360':
			$form->type = '360';
			$form->evaluator_type = '360';
			$form->visibility = 'anonymous';
			break;
		case 'intern360':
			$form->type = 'intern';
			// It's technically 1, 2, and 3, but this works for now
			$form->evaluator_type = 'ca-1';
			$form->visibility = 'anonymous';
			break;
		case 'external':
			$form->type = 'resident';
			$form->evaluator_type = 'external';
			$form->visibility = 'visible';
			break;
		case "resident":
		default:
			$form->type = "resident";
			$form->evaluator_type = "faculty";
			$form->visibility = "visible";
			break;
		}

		$formXml = new SimpleXMLElement("<form></form>");
		$formXml->addChild('title', $request->input('title'));
		foreach($request->input('items') as $item){
			if($item['type'] == 'instruction'){
				$formXml->addChild('instruction', htmlspecialchars($item['text']));
			}
			elseif($item['type'] == 'question'){
				$question = $formXml->addChild('question');
				$question->addAttribute('name', $item['questionId']);
				$question->addAttribute('type', $item['questionType']);
				if ($item['required'])
					$question->addAttribute('required', 'required');

				$question->addChild('text', htmlspecialchars($item['text']));
				if($item['weight'])
					$question->addAttribute('weight', $item['weight']);

				if(in_array($item['questionType'], ['radio', 'radiononnumeric', 'checkbox'])){
					if(!$item['options'])
						throw new \Exception("No options in question {$item['questionId']}: " . var_dump($item));

					foreach($item['options'] as $option){
						$optionNode = $question->addChild('option', htmlspecialchars($option['text']));
						$optionNode->addAttribute('value', $option['value']);
						if(array_key_exists('description', $option))
							$optionNode->addAttribute('description', htmlspecialchars($option['description']));
					}
				}
			}
			else {
				throw new \Exception("Unknown item type `{$item['type']}` in item: " . var_dump($item));
			}
		}

    	$dom = new DOMDocument('1.0');
    	$dom->preserveWhiteSpace = false;
    	$dom->formatOuput = true;
    	$dom->loadXML($formXml->asXML());
    	$dom->save(storage_path("app")."/".$form->xml_path);

		$form->save();

        if(in_array($request->input('formType'), ['resident', 'fellow'])){
			foreach($request->input('items') as $item){
				if(!empty($item['milestones']) && count($item['milestones']) > 0){
					foreach($item['milestones'] as $milestoneId){
						MilestoneQuestion::create([
							'form_id' => $form->id,
							'question_id' => $item['questionId'],
							'milestone_id' => $milestoneId
						]);
					}
				}
				if(!empty($item['competencies'])){
					foreach($item['competencies'] as $competencyId){
						CompetencyQuestion::create([
							'form_id' => $form->id,
							'question_id' => $item['questionId'],
							'competency_id' => $competencyId
						]);
					}
				}
			}
        }

		if($request->ajax())
			return "success";
		else
    		return redirect("manage/forms");
	}

	public function showAsJson(Request $request, $id){
		$form = Form::with('milestoneQuestions', 'competencyQuestions')->findOrFail($id);

		return $form->contents;
	}
}
