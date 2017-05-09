<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use Carbon\Carbon;

use App\FacultyPeerEvaluation;
use App\FacultyPeerForm;
use App\User;

use Auth;
use Log;

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
				: redirect('dashboard')->with('error', 'You are not currently allowed to create a Faculty 360 evaluation');
		})->only(['request', 'evaluate']);
	}

	public function request() {
		$facultyQuery = User::ofType('faculty')->active();

		if (Auth::check())
			$facultyQuery = $facultyQuery->where('id', '!=', Auth::id());

		$faculty = $facultyQuery->get();

		$forms = FacultyPeerForm::where('status', 'active')->get();

		$data = compact('faculty', 'forms');

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
			$evaluation = FacultyPeerEvaluation::byHash($hash)
				->with('form')
				->with([
					'subject' => function($query) {
						return $query->select([
							'id',
							'first_name',
							'last_name'
						]);
					}
				])->firstOrFail();

			$data = compact('evaluation');

			return view('faculty360.evaluate', $data);

		} catch (ModelNotFoundException $e) {
			$message = 'No evaluation found for the given identifier';
			return $request->ajax()
				? response()->json(['error' => $message], 404)
				: view('faculty360.invalid-hash');
		} catch (\Exception $e) {
			Log::debug($e);
			return back()->with('error', 'There was a problem completing the evaluation, sorry about that! Please let me know at jmischka@mcw.edu');
		}
	}
}
