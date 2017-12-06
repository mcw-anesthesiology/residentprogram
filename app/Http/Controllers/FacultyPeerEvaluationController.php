<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use Carbon\Carbon;

use App\FacultyPeerEvaluation;
use App\FacultyPeerForm;
use App\Milestone;
use App\User;

use Auth;
use Hashids;
use Log;

class FacultyPeerEvaluationController extends Controller
{
	const ALLOWED_USER_TYPES = [
		'faculty',
		'staff'
	];

    public function __construct() {
		$this->middleware('site-feature:faculty360');
		$this->middleware('auth')->except('request');
		$this->middleware('shared');
		$this->middleware('type:admin')->only('manage');

		$this->middleware(function ($request, $next) {
			if (!Auth::check() || Auth::user()->isType(self::ALLOWED_USER_TYPES))
				return $next($request);

			return $request->ajax()
				? response('Not allowed', 403)
				: redirect('dashboard')->with('error', 'You are not currently allowed to create a Faculty 360 evaluation');
		})->only(['request', 'evaluate']);

		$this->middleware(function ($request, $next) {
			try {
				$eval = FacultyPeerEvaluation::findOrFail(
					Hashids::decode($request->route()->parameters()['id'])[0]);

				if (
					Auth::check()
					&& (
						Auth::user()->isType('admin')
						|| Auth::id() == $eval->subject_id
						|| Auth::user()->usesFeature('FACULTY_EVALS')
					)
				)
					return $next($request);
			} catch (ModelNotFoundException $e) {
				return $request->ajax()
					? response('Not found', 404)
					: back()->with('error', 'No evaluation found for given identifier');
			} catch (\Exception $e) {
				Log::debug($e);
				return $request->ajax()
					? response('Error', 500)
					: back()->with('error', 'There was a problem viewing the evaluation');
			}

			return $request->ajax()
				? response('Not allowed', 403)
				: back()->with('error', 'You are not allowed to view that faculty 360 evaluation');

		})->only('view');
	}

	public function request() {
		$facultyQuery = User::ofType('faculty')->active();

		if (Auth::check())
			$facultyQuery = $facultyQuery->where('id', '!=', Auth::id());

		$faculty = $facultyQuery->get();

		$forms = FacultyPeerForm::where('status', 'active')->get();

		$data = compact('faculty', 'forms');

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

	public function view(Request $request, $id) {
		try {
			$evaluation = FacultyPeerEvaluation::with('form')
				->where('id', Hashids::decode($id)[0])
				->where('status', 'complete')
				->firstOrFail();

			if (Auth::id() == $evaluation->subject_id) {
				$evaluation->seen_by_subject_at = Carbon::now();
				$evaluation->save();
			}

			$evaluation->hideFields();

			$data = compact('evaluation');

			return view('faculty360.view', $data);
		} catch (\Exception $e) {
			// Nothing to do
		}

		return back()->with('error', "The faculty360 evaluation does not exist or you don't have permission to view it");
	}

	public function manage() {
        return view('manage.faculty360');
    }
}
