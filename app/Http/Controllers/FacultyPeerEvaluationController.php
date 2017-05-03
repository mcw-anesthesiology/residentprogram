<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Evaluation;
use App\Milestone;
use App\User;

use Auth;

class FacultyPeerEvaluationController extends Controller
{
    public function __construct() {
		$this->middleware(function ($request, $next) {
			if (!Auth::check() || Auth::user()->isType('faculty'))
				return $next($request);
				
			return response('Not allowed', 403);
		})->only('request');
		
		// Allow @mcw.edu email addresses to request,
		// disallow residents
		$this->middleware(function ($request, $next) {
			// TODO
			
		})->only('createEvaluation');
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
	
	public function createEvaluation(Request $request) {
		
	}
	
	public function validateEmail(Request $request) {
		if ($request->has('email') && self::emailValid($request->input('email')))
			return response()->json([
				'email' => $email,
				'valid' => true
			]);
		
		return response()->json([
			'email' => $email,
			'valid' => false
		]);
	}
	
	private static function emailValid($email) {
		return (User::ofType(['faculty','staff'])->where('email', $email)
			->count() == 0);
	}
}
