<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProgramsController extends Controller
{
	public function __construct() {
		$this->middleware([
			'auth',
			'shared'
		]);
	}

	public function dashboard() {
		return view('programs.dashboard');
	}
}
