<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;

use App\Evaluation;
use App\User;

use Auth;

class ExternalEvaluationController extends Controller
{
	public function __construct() {
		$this->middleware(['auth', 'type:admin']);
		$this->middleware(['shared'])->only('route');
	}

	public function route() {
		return view('evaluations.request-external');
	}

	public function index(Request $request) {
		return Evaluation::with([
			'form:id,title,type,visibility',
			'subject:id,first_name,last_name',
			'evaluator:id,first_name,last_name',
			'requestor:id,first_name,last_name'
		])->whereHas('form', function($query) {
			$query->where('evaluator_type', 'external');
		})->between($request->input('startDate'), $request->input('endDate'))
		->get();
	}

	public function store(Request $request) {
		$data = array_merge($request->all(), [
			'requested_by_id' => Auth::id(),
			'status' => 'pending',
			'request_date' => Carbon::now(),
			'request_ip' => $request->ip()
		]);
		$eval = new Evaluation($data);
		$eval->training_level = $eval->subject->training_level;
		$eval->completion_hash = str_random(40);
		$eval->hash_expires = $request->input('hash_expires', '9999-12-31');

		$eval->save();

		$eval->fresh();

		$eval->load(['subject', 'evaluator']);

		return $eval;
	}

	public function show(Evaluation $evaluation) {
		$evaluation->load([
			'form:id,title,type,visibility',
			'subject:id,first_name,last_name',
			'evaluator:id,first_name,last_name',
			'requestor:id,first_name,last_name'
		]);

		return $evaluation;
	}
}
