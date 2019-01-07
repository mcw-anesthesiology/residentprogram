<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Scopes\UserScope;

use App\User;

use Auth;

class UserController extends RestController
{
	public function __construct() {
        $this->middleware('auth');
		$this->middleware('type:admin', ['except' => [
			'index',
			'show',
			'settings',
			'user'
		]]);

		$this->scopes = [
			'user' => new UserScope()
		];
    }

	protected $relationships = [
		'subjectEvaluations',
		'evaluatorEvaluations',
		'requestedEvaluations',
		'mentees',
		'watchedForms',
		'meritReports',
		'userSettings',
		'administratedPrograms'
	];

	protected $attributes = [
		'id',
		'username',
		'type',
		'status',
		'training_level',
		'first_name',
		'last_name',
		'email',
		'notifications',
		'reminder_frequency',
		'specific_type'
	];

	protected $model = \App\User::class;

	public function user() {
		$user = Auth::user();
		$user->load('userSettings');

		return $user;
	}

	public function store(Request $request) {
		if (!filter_var($request->input("email"), FILTER_VALIDATE_EMAIL))
			throw new \Exception("Email appears invalid");
		elseif ($request->hasFile("photo") && !$request->file("photo")->isValid())
			throw new \Exception("Problem with photo");

		$user = new User();
		$user->email = $request->input("email");
		$user->first_name = $request->input("first_name");
		$user->last_name = $request->input("last_name");
		$user->reminder_frequency = $request->input("reminder_frequency", "weekly");
		$user->notifications = $request->input("notifications", "no");

		if ($request->input('type') == 'external') {
			$user->username = $user->email;
			$user->password = bcrypt(str_random(32));
			$user->status = 'active';
			$user->type = 'external';
			$user->save();

			return $user;
		} else {
			$password = str_random(12);
			$user->username = $request->input("username");
			$user->password = bcrypt($password);
			$user->status = $request->input("status", "active");

			if ($request->hasFile("photo") && $request->file("photo")->isValid()) {
				$photoExtension = $this->getExtension($request->file("photo"));
				$photoName = uniqid() . "." . $photoExtension;
				$request->file("photo")->move(storage_path("app/photos/"), $photoName);
				$user->photo_path = "/photos/".$photoName;
			}

			if ($request->input("type") == "resident") {
				$user->type = $request->input("type");
				$user->training_level = $request->input("training_level");
			} elseif ($request->input("type") == "fellow") {
				$user->type = "resident";
				$user->training_level = "fellow";
			} else {
				$user->type = $request->input("type");
			}

			$user->save();

			if ($request->has("send_email")) {
				$user->sendNewAccountEmail($password);
			}

			return $request->ajax()
				? 'success'
				: back();
		}
	}

	public function update(Request $request, $id) {
		if ($request->has("email")
				&& !filter_var($request->input("email"), FILTER_VALIDATE_EMAIL))
			throw new \Exception("Email appears invalid");

		if ($request->hasFile("photo")
				&& !$request->file("photo")->isValid())
			throw new \Exception("Problem with photo");

		if ($request->has("status")
				&& !in_array($request->input("status"), ["active", "inactive"]))
			throw new \Exception("Unknown status");

		$user = User::findOrFail($id);

		$updates = $request->all();

		if ($user->type == 'external' && $request->has('email')) {
			$updates['username'] = $updates['email'];
		}

		$user->update($updates);

		if ($request->hasFile("photo") && $request->file("photo")->isValid()) {
			$photoExtension = $this->getExtension($request->file("photo"));
			$photoName = uniqid() . "." . $photoExtension;
			$request->file("photo")->move(storage_path("app/photos/"), $photoName);
			if (!empty($user->photo_path)) {
				try {
					unlink(storage_path("app/".$user->photo_path));
				} catch (\Exception $e) {

				}
			}
			$user->photo_path = "/photos/".$photoName;
		}

		$user->save();

		return $request->ajax()
			? 'success'
			: back();
	}

	public function password(Request $request, $id) {
		$user = User::findOrFail($id);
		if (!$user->resetPassword())
			throw new \Exception("Failed to reset password");

		return $request->ajax()
			? 'success'
			: back();
	}

	public function welcome(Request $request, $id) {
		$user = User::findOrFail($id);
		if (!$user->sendNewAccountEmail())
			throw new \Exception("Failed to send welcome email");

		return $request->ajax()
			? 'success'
			: back();
	}

	public function settings(Request $request) {
		$user = Auth::user();

		$userSettings = config('constants.USER_SETTINGS');
		$saved = [];

		foreach ($userSettings as $name => $options) {
			if ($request->has($name)) {
				$value = $request->input($name);
				if (in_array($value, $options)) {
					$saved[$name] = $user->saveSetting($name, $value);
				}
			}
		}

		foreach (array_keys($request->all()) as $name) {
			if (!array_key_exists($name, $saved))
				$saved[$name] = false;
		}

		return $saved;
	}

	protected function getExtension($file) {
		if (!empty($file->extension()))
			return $file->extension();
		elseif (!empty($file->clientExtension()))
			return $file->clientExtension();

		return ".jpg";
	}
}
