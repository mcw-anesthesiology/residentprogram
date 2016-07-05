<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Carbon\Carbon;

use Auth;
use Mail;
use Setting;

use App\Evaluation;
use App\FlaggedEvaluation;

class FlaggedEvaluationController extends RestController
{

	public function __construct(){
		$this->middleware("auth");
		$this->middleware("type:admin", ["except" => [
			"store"
		]]);
	}

	protected $relationships = [
		"evaluation",
		"evaluation.evaluator",
		"evaluation.subject"
	];

	protected $attributes = [
		"evaluation_id",
		"requested_action",
		"reason"
	];

	protected $model = \App\FlaggedEvaluation::class;

	public function store(Request $request){
		$user = Auth::user();
		$eval = Evaluation::findOrFail($request->input("evaluation_id"));
		if($eval->evaluator_id != $user->id)
			throw new \Exception("Only evaluators can flag evaluations");
		if(!in_array($eval->status, ["complete", "pending"]))
			throw new \Exception("Disabled or cancelled evaluations cannot be flagged");

		$flag = FlaggedEvaluation::create($request->all());
		try{
			$flaggedActions = Setting::get("flaggedActions");

			$data = [];
			$data["flaggerName"] = $user->full_name;
			$data["evaluationId"] = $eval->id;
			$data["requestedAction"] = $flaggedActions[$flag->requested_action];
			$data["reason"] = $flag->reason;
			$data["now"] = Carbon::now();

			Mail::send("emails.flag", $data, function($message){
				$message->to(config("app.admin_email"));
				$message->from("flag@residentprogram.com");
				$message->subject("Flagged evaluation");
			});
		} catch (\Exception $e){
			Log::error("Problem sending email: ".$e);

		}

		if($request->ajax())
			return "success";
		else
			return redirect("/");
	}
}
