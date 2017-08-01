<?php

namespace App\Http\Middleware;

use Closure;
use View;
use Auth;

use App\User;
use App\Form;
use App\Milestone;

class SharedVariables
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		View::share("ADMIN_EMAIL", config("app.admin_email"));

		if (Auth::check()) {
			View::share("user", Auth::user());

			$milestoneGroups = [];
			$milestones = Milestone::orderBy("title")->get();
			foreach($milestones as $milestone){
				$milestoneGroups[ucfirst($milestone->type)." ".$milestone->training_level][] = $milestone;
			}

			View::share("milestoneGroups", $milestoneGroups);

			$user = Auth::user();
			if (!$user->isType('resident')) {
				$reportableUserGroups = [];

				if ($user->usesFeature('RESIDENT_REPORTS')) {
					$residents = User::where('type', 'resident')
						->whereIn('training_level', [
							'intern',
							'ca-1',
							'ca-2',
							'ca-3'
						])->where('status', 'active')
						->orderBy('last_name')->get();

						$residentGroupNames = [
			                "intern" => "Intern",
			                "ca-1" => "CA-1",
			                "ca-2" => "CA-2",
			                "ca-3" => "CA-3"
			            ];
			            $reportableUserGroups = [
			                "Intern" => [],
			                "CA-1" => [],
			                "CA-2" => [],
			                "CA-3" => []
			            ];

					foreach($residents as $resident){
		                $reportableUserGroups[$residentGroupNames[$resident->training_level]][] = $resident;
		            }
				}

				if (!empty($user->mentees)) {
					$reportableUserGroups['Mentee'] = $user->mentees;
				}

				View::share('reportableUserGroups', $reportableUserGroups);
			}
		}

        return $next($request);
    }
}
