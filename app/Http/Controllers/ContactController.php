<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use Log;
use Mail;

use App\Contact;

class ContactController extends Controller {

	public function __construct() {
		$this->middleware('auth');
		$this->middleware('shared')->only('contact');
	}

	public function contact() {
        return view("dashboard.contact");
    }

    public function saveContact(Request $request) {
        $user = Auth::user();
        $contact = new Contact();
        $contact->user_id = $user->id;
        $contact->subject = $request->input("subject");
        $contact->body = $request->input("body");
        $contact->save();

        $data = [];
        $data["body"] = $contact->body;
        $data["email"] = $user->email;
        $data["firstName"] = $user->first_name;
        $data["lastName"] = $user->last_name;

        $subject = $contact->subject;
		$replyTo = $user->email;
        try {
            Mail::send("emails.contact", $data, function($message) use ($subject, $replyTo) {
                $message->to(config("app.admin_email"));
                $message->from("contact@residentprogram.com");
                $message->subject($subject);
				$message->replyTo($replyTo);
            });
        } catch(\Exception $e) {
			Log::error("Problem sending email: ".$e);
        }
        return redirect("dashboard")->with("success", "Thank you! Your message has been sent and I will get back to you shortly");
    }
}
