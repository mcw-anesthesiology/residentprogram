<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Auth;
use Log;
use Mail;

use App\Alum;
use App\User;

class AlumController extends RestController
{
	public function __construct() {
		$this->middleware('auth', ['except' => [
			'getByHash',
			'updateWithHash',
			'updateSubscription'
		]]);
		$this->middleware('type:admin', ['except' => [
			'getByHash',
			'updateWithHash',
			'updateSubscription'
		]]);
		$this->middleware('update.alum', ['only' => [
			'getByHash',
			'updateWithHash',
			'updateSubscription'
		]]);
	}

	protected $relationships = [];

	protected $attributes = [
		'last_name',
		'first_name',
		'email',
		'address',
		'address_2',
		'city',
		'state',
		'zip',
		'country',
		'employer',
		'graduation_date',
		'notes'
	];

	protected $model = \App\Alum::class;

	public function getByHash(Request $request, $hash) {
		return Alum::where("update_hash", $hash)->firstOrFail();
	}

	public function updateWithHash(Request $request, $hash) {
		Alum::where("update_hash", $hash)->firstOrFail()->update($request->all());

		if ($request->ajax())
			return "success";
		else
			return back();
	}

	public function updateSubscription(Request $request, $hash) {
		$alum = Alum::where("update_hash", $hash)->firstOrFail();
		$alum->do_not_contact = (bool)$request->input("do_not_contact");
		$alum->saveOrFail();

		if ($request->ajax())
			return "success";
		else
			return back();
	}

	public function sendEmail(Request $request, $id) {
		$user = Auth::user();
		$alum = Alum::findOrFail($id);
		if (!$alum->email || !filter_var($alum->email, FILTER_VALIDATE_EMAIL))
			throw new \Swift_TransportException("Invalid or missing email address");
		if ($alum->do_not_contact)
			throw new \Exception("Alum requested to not be contacted");

		$alum->generateHash();

		$body = $request->input("body");
		$subject = $request->input("subject");

		$updateUrl = url("alum/{$alum->update_hash}");
		$placeholders = [
			'<span class="label label-info">Name</span>' => $alum->full_name,
			'<span class="label label-info">First name</span>' => $alum->first_name,
			'<span class="label label-info">Last name</span>' => $alum->last_name,
			'<span class="label label-info">Link</span>' => "<a href='{$updateUrl}'>{$updateUrl}</a>"
		];
		foreach ($placeholders as $placeholder => $replacement) {
			$body = str_replace($placeholder, $replacement, $body);
		}
		Mail::send([], [], function($message) use ($alum, $user, $body, $subject) {
			$message
				->from("alumni@residentprogram.com", "MCW Anesthesiology Alumni")
				->replyTo($user->email)
				->to($alum->email)
				->subject($subject)
				->setBody($body, "text/html");
		});

		if ($request->ajax())
			return "success";
		else
			return back();
	}

	public function sendEmails(Request $request) {
		$successfulEmails = [];
		$failedEmails = [];
		$alumni = $request->input('to');

		foreach ($alumni as $alum) {
			try {
				if ($this->sendEmail($request, $alum["id"]) == "success")
					$successfulEmails[] = $alum;
				else
					$failedEmails[] = $alum;

				if (config('app.env') != 'production')
					sleep(1);
			} catch(ModelNotFoundException $e) {
				Log::error($e);
				$failedEmails[] = $alum;
			} catch(\Swift_TransportException $e) {
				Log::error($e);
				$failedEmails[] = $alum;
			} catch(\Exception $e) {
				Log::error($e);
				$failedEmails[] = $alum;
			}
		}

		$response = [
			"success" => $successfulEmails,
			"error" => $failedEmails
		];

		if ($request->ajax()) {

			return $response;
		} else {
			$successfulEmailsEmails = array_map(function($alum) {
				return $alum["email"];
			}, $successfulEmails);
			$successText = "Successfully sent emails to " . join(", ", $successfulEmailsEmails);

			$failedEmailsEmails = array_map(function($alum) {
				return $alum["email"];
			}, $failedEmails);
			$errorText = "Unsuccessfully sent emails to " . join(", ", $failedEmailsEmails);

			return back()->with([
				"success" => $successText,
				"error" => $errorText
			]);
		}
	}

	public function importFromUsers(Request $request) {
		if (!$request->has("users"))
			throw new \Exception("No users given");

		$response = [
			"successes" => [],
			"notFound" => [],
			"errors" => []
		];

		foreach ($request->input("users") as $inputUserId) {
			try {
				$user = User::findOrFail($inputUserId)->toArray();
				if (empty($user["graduation_date"]) && $request->has("graduation_date"))
					$user["graduation_date"] = $request->input("graduation_date");

				Alum::create($user);

				$response["successes"][] = $inputUserId;
			} catch(ModelNotFoundException $e) {
				$response["notFound"][] = $inputUserId;
			} catch(\Exception $e) {
				Log::error("Problem importing alum from users: " . $e);
				$response["errors"][] = $inputUserId;
			}
		}

		if ($request->ajax())
			return $response;
		else
			return back() // TODO: Make these readable strings
				->with("success", $response["successes"])
				->with("error", $response["errors"])
				->with("info", $response["notFound"]);
	}
}
