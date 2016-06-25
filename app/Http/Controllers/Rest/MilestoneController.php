<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Milestone;

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
}
