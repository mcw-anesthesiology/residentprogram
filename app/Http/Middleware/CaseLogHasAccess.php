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
			if($user->isType("admin") || $user->usesFeature(config("constants.FEATURES.CASE_LOG")))
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
