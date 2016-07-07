<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Evaluation;

class EvaluationController extends RestController
{

	public function __construct(){
		$this->middleware("auth");
		$this->middleware("type:admin", ["except" => [
			"index", "store", "show", "cancel"
		]]);
		$this->middleware("cancel.evaluation", ["only" => [
			"cancel"
		]]);
		$this->middleware("create.evaluation", ["only" => [
			"store"
		]]);
	}

	protected $relationships = [
		"evaluator",
		"subject",
		"requestor",
		"form",
		"responses",
		"textResponses",
		"flag"
	];

	protected $relationshipAttributes = [
		"form" => [
			"type",
			"evaluator_type"
		]
	];

	protected $attributes = [
		"id",
		"form_id",
		"evaluator_id",
		"subject_id",
		"requested_by_id",
		"status",
		"training_level",
		"request_date",
		"complete_date",
		"evaluation_date"
	];

	protected $model = \App\Evaluation::class;

	public function update(Request $request, $id){
		$eval = Evaluation::find($id);
        if($request->has("action")){
            switch($request->input("action")){
                case "disable":
                    $eval->status = "disabled";
                    break;
                case "enable":
                    if($eval->complete_date)
                        $eval->status = "complete";
                    else
                        $eval->status = "pending";
                    break;
                case "cancel":
                    $eval->status = "canceled by admin";
                    break;
                case "visibility":
                    if($request->input("visibility") == "reset")
                        $eval->visibility = null;
                    else
                        $eval->visibility = $request->input("visibility");
                    $eval->save();
                    return $eval->visibility;
                    break;
                default:
                    return "false";
                    break;
            }
            $eval->save();
            return $eval->status;
        }
	}

	public function remind(Request $request, $id){
		$eval = Evaluation::find($id);
		if(!$eval->sendNotification(true))
			throw new \Exception("Failed to send reminder");

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function cancel(Request $request, $id){
		$user = Auth::user();

		if($user->isType("admin"))
			$userRole = "admin";
		elseif($user->id == $eval->subject_id)
			$userRole = "subject";
		elseif($user->id == $eval->evaluator_id)
			$userRole = "evaluator";
		else
			$userRole = $user->specific_type;

		$eval->status = "canceled by " . $userRole;
		$eval->save();

		if($request->ajax())
			return "success";
		else
			return back();
	}
}
