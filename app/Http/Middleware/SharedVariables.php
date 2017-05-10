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
		}

        return $next($request);
    }
}
