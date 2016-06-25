<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Competency;

class CompetencyController extends RestController
{

	protected $relationships = [
		"competencies_questions",
		"levels",
		"forms"
	];

	protected $attributes = [
		"id",
		"title",
		"description"
	];

	protected $model = \App\Competency::class;

	public function destroy(Request $request, $id){
		$competency = Competency::findOrFail($id);
		if($competency->forms->count() == 0)
			$competency->delete();

		if($request->ajax())
			return "success";
		else
			return back();
	}
}
