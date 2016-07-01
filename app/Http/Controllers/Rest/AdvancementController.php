<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Carbon\Carbon;

use Log;

use App\Advancement;
use App\User;

class AdvancementController extends RestController
{

	protected $relationships = [
		"user"
	];

	protected $attributes = [
		"id",
		"user_id",
		"advanced_field",
		"advanced_value",
		"run_at",
		"complete",
		"successful"
	];

	protected $model = \App\Advancement::class;

	public function store(Request $request){
		$input = $request->all();
		if($input["run_at"] == "now")
			$input["run_at"] = Carbon::now();

		$advancement = Advancement::create($input);

		if($advancement->run_at <= Carbon::now()){
			try {
				$advancement->run();
			} catch(\Exception $e){
				return response("Advancement was created but its execution was unsuccessful", 201);
			}
		}

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function storeMany(Request $request){
		$trainingLevelAdvancements = [
			"intern" => "ca-1",
			"ca-1" => "ca-2",
			"ca-2" => "ca-3",
			"ca-3" => "fellow"
		];

		$response = [
			"successes" => [],
			"failedRuns" => [],
			"errors" => []
		];
		foreach($request->input("user_ids") as $userId){
			$storeRequest = $request->duplicate();
			$storeRequest->replace($request->except("user_ids"));
			$storeRequest->merge(["user_id" => $userId]);
			try {
				if(!$storeRequest->has("advanced_value")){
					if($storeRequest->input("advanced_field") == "training_level"){
						$user = User::findOrFail($userId);
						$storeRequest->merge([
							"advanced_value" => $trainingLevelAdvancements[$user->training_level]
						]);
					}
				}

				$storeResponse = $this->store($storeRequest);
				if($storeResponse == "success")
					$response["successes"][] = $userId;
				else
					$response["failedRuns"][] = $userId;
			} catch(\Exception $e){
				Log::error($e);
				$response["errors"][] = $userId;
			}
		}

		if($request->ajax())
			return $response;
		else
			return back() // TODO: Make these readable strings
				->with("success", $response["successes"])
				->with("info", $response["failedRuns"])
				->with("error", $response["errors"]);
	}

	public function destroy(Request $request, $id){
		$advancement = Advancement::findOrFail($id);
		if($advancement->complete)
			throw new \Exception("Cannot remove a complete advancement");

		$advancement->delete();

		if($request->ajax())
			return "success";
		else
			return back();
	}

}
