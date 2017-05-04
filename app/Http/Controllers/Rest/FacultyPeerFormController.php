<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Debugbar;

use App\FacultyPeerForm;

class FacultyPeerFormController extends RestController
{

	protected $relationships = [
		"evaluations"
	];

	protected $attributes = [
		"id"
	];

	protected $model = \App\FacultyPeerForm::class;
	
	public function __construct() {
		$this->middleware('shared')->only(['create', 'view']);
	}
	
	public function create() {
		return view('faculty360.forms.create');
	}

	public function store(Request $request){
		if(!$request->has('title'))
			throw new \Exception('No title');

		if(!$request->has('items') || count($request->input('items')) == 0)
			throw new \Exception('No items');
			
		// FIXME: Validate form contents

		$form = new FacultyPeerForm();
		$form->title = $request->input('title');
		$form->evaluation_period_type = $request->input('evaluation_period_type', 'month');
		$form->contents = [
			'items' => $request->input('items')
		];
		$form->save();
		$form = $form->fresh();

		if($request->ajax())
			return "success";
		else
    		return redirect("faculty360/forms/view/{$form->id}");
	}
	
	public function view(Request $request, $id) {
		return view('faculty360.forms.view');
	}
	
	public function destroy(Request $request, $id) {
		$form = FacultyPeerForm::findOrFail($id);
		$form->status('disabled');
		$form->save();
	}
}
