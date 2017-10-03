<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Alum;

class AlumniController extends Controller {
    public function __construct() {
		$this->middleware('site-feature:alumni');
		$this->middleware(['auth', 'type:admin', 'shared'])->only('manage');
	}

	public function alumni(Request $request, $hash) {
		try {
			$alum = Alum::where("update_hash", $hash)->firstOrFail();
			$ADMIN_EMAIL = config("app.admin_email");
			$data = compact('hash', "alum", "ADMIN_EMAIL");
			return view("dashboard.alumni", $data)->with(["noNavbar" => true]);
		} catch(ModelNotFoundException $e) {
			return view("dashboard.alumni.invalid-url")->with("noNavbar", true);
		}
	}

	public function manage(Request $request){
		return view("manage.alumni");
	}
}
