<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class UserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
		if (Auth::user()->hasRole($role)) {
			return $next($request);
		}

		return $request->ajax()
			? response('Unauthorized', 403)
			: redirect('dashboard')->with('error', 'You do not have permission to access that page');
    }
}
