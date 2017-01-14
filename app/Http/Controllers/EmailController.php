<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

use Auth;
use Log;
use Mail;

class EmailController extends Controller {
    
	public function __construct(){
		$this->middleware(['auth', 'type:admin']);
	}
	
	public function send(Request $request){
		
	}
	
	public function reminders(Request $request){
		$user = Auth::user();
		
		if(!$request->has('evalsRequired'))
			throw new \Exception("There was a problem sending emails, please contact {$config('app.admin_email')}");
		if(!$request->has('subject'))
			throw new \Exception('Please enter a subject');
		if(!$request->has('to'))
			throw new \Exception('Please select a recipient');
		if(!$request->has('body'))
			throw new \Exception('Please enter a message body');
		
		$evalsRequired = $request->input('evalsRequired');
		$subject = $request->input('subject');
		$bodyTemplate = $request->input('body');
		$usersNeedingEvals = $request->input('to');

		$namePlaceholder = '<span class="label label-info">Name</span>';
		$numCompletedPlaceholder = '<span class="label label-info"># Completed</span>';
		$numNeededPlaceholder = '<span class="label label-info"># Needed</span>';

		$success = [];
		$error = [];
		foreach($usersNeedingEvals as $remindedUser){
			try{
				$numCompleted = $remindedUser['numCompleted'];
				$userToRemind = User::findOrFail($remindedUser['id']);
				$body = str_replace($namePlaceholder, $userToRemind->last_name, $bodyTemplate);
				$body = str_replace($numCompletedPlaceholder, $numCompleted, $body);
				$body = str_replace($numNeededPlaceholder, $evalsRequired - $numCompleted, $body);

				Mail::send([], [], function($message)
						use ($user, $userToRemind, $subject, $body){
					$message->from('reminders@residentprogram.com', 'ResidentProgram Reminders');
					$message->replyTo($user->email);
					$message->to($userToRemind->email);
					$message->subject($subject);
					$message->setBody($body, 'text/html');
				});
				$success[] = $userToRemind->id;
				
				// Prevent mailtrap from refusing rapid emails in development
				if(config('app.env') != 'production')
					sleep(1);
			} catch (ModelNotFoundException $e){
				$error[] = $remindedUser['id'];
				Log::error('User not found: ' . $e);
			} catch (\Swift_TransportException $e){
				$error[] = $remindedUser['id'];
				Log::error('Error sending mail: ' . $e);
			} catch (\Exception $e){
				$error[] = $remindedUser['id'];
				Log::error($e);
			}
		}
		
		$response = [];
		if(count($success) > 0)
			$response['success'] = $success;
		if(count($error) > 0)
			$response['error'] = $error;
			
		return response()->json($response);
	}
}
