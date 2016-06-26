<?php

namespace App\Http\Controllers\Rest;

use Illuminate\Http\Request;

use App\Alum;

class AlumController extends RestController
{

	protected $relationships = [];

	protected $attributes = [
		"last_name",
		"first_name",
		"email",
		"address",
		"address_2",
		"city",
		"state",
		"zip",
		"country",
		"employer",
		"graduation_date",
		"notes"
	];

	protected $model = \App\Alum::class;

	public function sendEmail(Request $request, $id){
		$alum = Alum::findOrFail($id);
		$alum->sendEmail($request->input("message"));

		if($request->ajax())
			return "success";
		else
			return back();
	}

	public function sendAllEmails(Request $request){
		$successfulEmails = [];
		$failedEmails = [];
		foreach(Alum::all() as $alum){
			try {
				$alum->sendEmail();
				$successfulEmails[] = $alum;
			} catch(\Swift_TransportException $e){
				$failedEmails[] = $alum;
			}
		}

		$responseInfo = [];
		if(count($failedEmails) > 0){
			$error = "Failed sending emails to ";
			foreach($failedEmails as $failedAlum){
				$error .= $failedAlum->email . ", ";
			}
			$error = substr($error, -2); // Remove final ', '
			$responseInfo["error"] = $error;
		}
		if(count($successfulEmails) > 0){
			$success = "Successfully sent emails to ";
			foreach($successfulEmails as $successfulAlum){
				$success .= $successfulAlum->email . ", ";
			}
			$success = substr($success, -2); // Remove final ', '
			$responseInfo["success"] = $success;
		}
		$responseInfo["info"] = count($successfulEmails) .
			" emails sent successfully. " . count($failedEmails) .
			" failed attempts.";

		if($isAjax)
			return $responseInfo;
		else
			return back()->with($responseInfo);
	}
}
