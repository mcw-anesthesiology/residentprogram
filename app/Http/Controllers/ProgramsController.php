<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;

class ProgramsController extends Controller
{
	public function __construct() {
		$this->middleware([
			'auth',
			'shared'
		]);

		$this->middleware(function($request, $next) {
			if (Auth::user()->administratedPrograms->count() > 0)
				return $next($request);

			return $request->ajax()
				? reponse('Unauthorized', 403)
				: redirect('/dashboard')->with('error', 'You do not have permission to access that page');
		});
	}

	public function dashboard() {
		return view('programs.dashboard');
	}
}
