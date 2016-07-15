<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

use App\CaseLog;

class CaseLogHasAccess
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
		try {
			$user = Auth::user();

			$menteeWithCaseLog = false;
			if($user->mentees->count() > 0){
				$user->mentees->each(function($mentee) use (&$menteeWithCaseLog){
					if($mentee->usesFeature(config("constants.FEATURES.CASE_LOG")))
						$menteeWithCaseLog = true;
				});
			}

			if($user->isType("admin") || $user->usesFeature(config("constants.FEATURES.CASE_LOG")) || $menteeWithCaseLog)
				return $next($request);

			throw new \Exception();

		} catch(\Exception $e){
			if($request->ajax())
				return response('Unauthorized.', 401);
			else
				return back()->with("error", "You do not have access to the case log");
		}
    }
}
