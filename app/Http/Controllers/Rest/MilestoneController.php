<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Milestone;
use App\MilestoneLevel;

class MilestoneController extends RestController
{

	protected $relationships = [
		"milestonesQuestions",
		"levels",
		"forms"
	];

	protected $attributes = [
		"id",
		"title",
		"description"
	];

	protected $model = \App\Milestone::class;

	public function destroy(Request $request, $id){
		$milestone = Milestone::findOrFail($id);
		if($milestone->forms->count() == 0)
			$milestone->delete();

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function levels(Request $request, $id){
		$milestone = Milestone::find($id);
		$levels = $request->input("levels");
		foreach($levels as $levelNum => $level){
			$milestoneLevel = MilestoneLevel::firstOrNew([
				"milestone_id" => $id,
				"level_number" => $levelNum + 1
			]);
			$milestoneLevel->milestone_id = $id;
			$milestoneLevel->level_number = $levelNum + 1;
			$milestoneLevel->name = $level["name"];
			$milestoneLevel->description = $level["description"];
			$milestoneLevel->save();
		}
		MilestoneLevel::where("milestone_id", $id)
			->where("level_number", ">", count($levels))
			->delete();

		if($request->ajax())
			return "success";
		else
			return back();
	}
}
