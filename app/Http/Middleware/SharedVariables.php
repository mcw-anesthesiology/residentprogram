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
				$reportableUsers = [];
				if ($user->usesFeature('RESIDENT_REPORTS')) {
					$reportableUsers = User::where('type', 'resident')
						->whereIn('training_level', [
							'intern',
							'ca-1',
							'ca-2',
							'ca-3'
						])->get();
				} elseif (!empty($user->mentees)) {
					$reportableUsers = $user->mentees;
				}
				View::share('reportableUsers', $reportableUsers);
			}
		}

        return $next($request);
    }
}
