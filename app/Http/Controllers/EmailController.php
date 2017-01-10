<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

use Auth;

class EmailController extends Controller {
    
	public function __construct(){
		$this->middleware(['auth', 'type:admin']);
	}
	
	public function send(Request $request){
		
	}
	
	public function reminders(Request $request){
		$user = Auth::user();
		$evalsRequired = $request->input('evalsRequired');
		$subject = $request->input('subject');
		$bodyTemplate = $request->input('body');
		$usersNeedingEvals = $request->input('to');

		$namePlaceholder = '<span class="label label-info">Name</span>';
		$numCompletedPlaceholder = '<span class="label label-info"># Completed</span>';
		$numNeededPlaceholder = '<span class="label label-info"># Needed</span>';

		$sentUsers = [];
		foreach($usersNeedingEvals as $remindedUser){
			try{
				$numCompleted = $remindedUser['numCompleted'];
				$remindedUser = User::findOrFail($remindedUser['id']);
				$body = str_replace($namePlaceholder, $remindedUser->last_name, $bodyTemplate);
				$body = str_replace($numCompletedPlaceholder, $numCompleted, $body);
				$body = str_replace($numNeededPlaceholder, $evalsRequired - $numCompleted, $body);

				Mail::send([], [], function($message)
						use ($user, $remindedUser, $subject, $body){
					$message->from('reminders@residentprogram.com', 'ResidentProgram Reminders');
					$message->replyTo($user->email);
					$message->to($remindedUser->email);
					$message->subject($subject);
					$message->setBody($body, 'text/html');
				});
				$sentUsers[] = $remindedUser->id;
			} catch (ModelNotFoundException $e){
				Log::error('User not found in sendNeedsEvaluationReminder: ' . $e);
			} catch (\Swift_TransportException $e){
				Log::error('Error sending mail: ' . $e);
			} catch (\Exception $e){
				Log::error($e);
			}
		}
		return response()->json($sentUsers);
	}
}
