<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use Carbon\Carbon;

use Auth;
use Log;

use App\FacultyPeerEvaluation;
use App\FacultyPeerForm;
use App\User;

class FacultyPeerEvaluationController extends RestController
{

	public function __construct(){
		$this->middleware("auth");
		
		// Allow @mcw.edu email addresses to request,
		// disallow residents
		$this->middleware(function ($request, $next) {
			// TODO
			if (
				(
					$request->has('faculty_id')
					&& User::ofType('faculty')
						->where('id', $request->input('faculty_id'))
						->count() == 1
				)
				&& (
					(
						Auth::check()
						&& Auth::user()->isType('faculty')
						&& Auth::id() != $request->input('faculty_id')
					)
					|| (
						!Auth::check()
						&& $request->has('email')
						&& self::emailValid($request->input('email'))
					)
				)
			) {
				return $next($request);
			}
			
			
			
			if (!$request->has('faculty_id') || (
				!$request->has('email')
				&& !Auth::check()
			))
				return response()->json([
					'status' => 'denied',
					'reason' => 'Missing required input'
				], 404);
				
			if (
				($request->has('email') && !self::emailValid($request->input('email')))
				|| (Auth::check() && !Auth::user()->isType(self::ALLOWED_USER_TYPES))
			)
				return response()->json([
					'status' => 'denied',
					'reason' => 'Requestor invalid'
				], 403);
				
			return response()->json([
				'status' => 'denied',
				'reason' => 'Unknown'
			], 400);
			
		})->only('store');
	}

	protected $relationships = [
		"subject",
		"form"
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
		"subject_id",
		"status",
		"evaluation_date_start",
		"evaluation_date_end"
	];

	protected $model = \App\FacultyPeerEvaluation::class;
	
	public function store(Request $request) {
		// TODO
	}

	public function sendHash(Request $request, $id){
		// TODO
	}
	
	private static function emailValid($email) {
		$domain = '@mcw.edu';
		
		return (
			substr($email, -(strlen($domain)) === $domain)
			&& User::where('email', $email)
				->whereNotIn('type', self::ALLOWED_USER_TYPES)
				->count() == 0
		);
	}
}
