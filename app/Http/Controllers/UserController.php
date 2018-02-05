<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;

class UserController extends Controller {
	public function __construct() {
		$this->middleware('auth');
		$this->middleware('shared')->only('user');
		$this->middleware('type:faculty')->only([
			'saveUserReminders',
			'saveUserNotifications'
		]);
	}

	public function user() {
		$user = Auth::user();
		$frequency = $user->reminder_frequency;
		$onlyIfPending = $user->remind_only_if_pending;
		$notifications = $user->notifications;
		$data = compact("frequency", "onlyIfPending", "notifications");
        return view("dashboard.user", $data);
    }

    public function saveUser(Request $request) {
        $user = Auth::user();
        if (
			$request->input("new_password") == $request->input("new_password_confirm")
			&& password_verify($request->input("old_password"), $user->password)
		) {
            $user->password = bcrypt($request->input("new_password"));
            $user->save();
            return back()->with("success", "Password changed successfully!");
        } else {
            if ($request->input("new_password") != $request->input("new_password_confirm"))
                $error = "New passwords did not match";
            elseif (!password_verify($request->input("old_password"), $user->password))
                $error = "Current password verification failed";

            return back()->with("error", $error);
        }
    }

    public function saveUserReminders(Request $request) {
        $user = Auth::user();
        $user->reminder_frequency = $request->input("reminder_frequency");
		if ($request->has("remind_only_if_pending"))
			$user->remind_only_if_pending = $request->input("remind_only_if_pending");
		else
			$user->remind_only_if_pending = "no";
        $user->save();

		return $request->ajax()
			? 'success'
			: back()->with("success", "Reminder preferences saved successfully!");
    }

    public function saveUserNotifications(Request $request) {
        $user = Auth::user();

        $user->notifications = ($request->input("notifications") == 'no')
			? 'no'
			: 'yes';

        $user->save();

		return $request->ajax()
			? 'success'
			: back()->with("success", "Notifications preferences saved successfully!");
    }

}
