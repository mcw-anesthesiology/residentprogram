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
	
	public function saveOrder(Request $request){
		Competency::whereNotNull('order')->update(['order' => null]);
		$successes = [];
		$errors = [];
		foreach($request->input('orderMap', []) as $orderPair){
			try {
				Competency::where('id', $orderPair['id'])
					->update(['order' => $orderPair['order']]);
				$successes[] = $orderPair['id'];
			} catch (\Exception $e){
				$errors[] = !empty($orderPair['id'])
					? $orderPair['id']
					: 'Unknown';
			}
		}
		
		$results = [];
		if(!empty($successes))
			$results['success'] = $successes;
		if(!empty($errors))
			$results['error'] = $errors;
			
		return $results;
	}

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
