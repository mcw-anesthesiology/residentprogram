<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\User;

class UserController extends RestController
{

	protected $relationships = [
		"subjectEvaluations",
		"evaluatorEvaluations",
		"requestedEvaluations",
		"mentees",
		"watchedForms"
	];

	protected $attributes = [
		"id",
		"username",
		"type",
		"status",
		"training_level",
		"first_name",
		"last_name",
		"email",
		"notifications",
		"reminder_frequency",
		"specific_type"
	];

	protected $model = \App\User::class;

	public function store(Request $request){
		if(!filter_var($request->input("email"), FILTER_VALIDATE_EMAIL))
			throw new \Exception("Email appears invalid");
		elseif($request->hasFile("photo") && !$request->file("photo")->isValid())
			throw new \Exception("Problem with photo");

		$password = str_random(12);
		$user = new User();
		$user->username = $request->input("username");
		$user->email = $request->input("email");
		$user->password = bcrypt($password);
		$user->first_name = $request->input("first_name");
		$user->last_name = $request->input("last_name");
		$user->status = $request->input("status", "active");
		$user->reminder_frequency = $request->input("reminder_frequency", "weekly");
		$user->notifications = $request->input("notifications", "no");
		if($request->hasFile("photo") && $request->file("photo")->isValid()){
			$photoName = uniqid().".".$request->file("photo")->getExtension();
			$request->file("photo")->move(storage_path("app/photos/"), $photoName);
			$user->photo_path = "photos/".$photoName;
		}
		if($request->input("type") == "resident"){
			$user->type = $request->input("type");
			$user->training_level = $request->input("training_level");
		} else if($request->input("type") == "fellow"){
			$user->type = "resident";
			$user->training_level = "fellow";
		} else{
			$user->type = $request->input("type");
		}
		$user->save();
		if($request->has("send_email"))
			$user->sendNewAccountEmail($password);

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function update(Request $request, $id){
		if($request->has("email")
				&& !filter_var($request->input("email"), FILTER_VALIDATE_EMAIL))
			throw new \Exception("Email appears invalid");
		if($request->hasFile("photo")
				&& !$request->file("photo")->isValid())
			throw new \Exception("Problem with photo");
		if($request->has("status")
				&& !in_array($request->input("status"), ["active", "inactive"]))
			throw new \Exception("Unknown status");

		$user = User::findOrFail($id);
		$user->update($request->all());

		if($request->hasFile("photo") && $request->file("photo")->isValid()){
			$photoName = uniqid().".".$request->file("photo")->getExtension();
			$request->file("photo")->move(storage_path("app/photos/"), $photoName);
			if(!empty($user->photo_path))
				unlink(storage_path("app/".$user->photo_path));
			$user->photo_path = "photos/".$photoName;
		}

		$user->save();

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function password(Request $request, $id){
		$user = User::findOrFail($id);
		if(!$user->resetPassword())
			throw new \Exception("Failed to reset password");

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function welcome(Request $request, $id){
		$user = User::findOrFail($id);
		if(!$user->sendNewAccountEmail())
			throw new \Exception("Failed to send welcome email");

		if($request->ajax())
			return "success";
		else
			return back();
	}
}
