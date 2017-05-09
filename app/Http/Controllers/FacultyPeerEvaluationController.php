<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use Carbon\Carbon;

use App\Evaluation;
use App\Milestone;
use App\User;

use Auth;

class FacultyPeerEvaluationController extends Controller
{
	const ALLOWED_USER_TYPES = [
		'faculty',
		'staff'
	];
	
    public function __construct() {
		$this->middleware(function ($request, $next) {
			if (!Auth::check() || Auth::user()->isType(self::ALLOWED_USER_TYPES))
				return $next($request);
				
			return $request->ajax()
				? response('Not allowed', 403)
				: back()->with('error', 'You are not currently allowed to create a Faculty 360 evaluation');
		})->only('request');
	}
	
	public function request() {
		$facultyQuery = User::ofType('faculty')->active();
			
		if (Auth::check())
			$facultyQuery = $facultyQuery->where('id', '!=', Auth::id());
			
		$faculty = $facultyQuery->get();
		
		$data = compact('faculty');
		
		if (Auth::check()) {
			$data['user'] = Auth::user();
			
			$milestoneGroups = [];
	        $milestones = Milestone::orderBy("title")->get();
	        foreach($milestones as $milestone){
	            $milestoneGroups[ucfirst($milestone->type)." ".$milestone->training_level][] = $milestone;
	        }
			$data['milestoneGroups'] = $milestoneGroups;
		}
		
		return view('faculty360.request', $data);
	}
	
	public function evaluate(Request $request, $hash) {
		try {
			$evaluation = FacultyPeerEvaluation::where('hash', $hash)
				->where('hash_expires', '>', Carbon::now())
				->firstOrFail();
				
			// TODO
		} catch (ModelNotFoundException $e) {
			$message = 'No evaluation found for the given identifier';
			return $request->ajax()
				? response()->json(['error' => $message], 404)
				: back()->with('error', $message);
		} catch (\Exception $e) {
			return back()->with('error', 'There was a problem completing the evaluation, sorry about that! Please let me know at jmischka@mcw.edu');
		}
	}	
}
