<?php

namespace App\Http\Middleware;

use Closure;

use Auth;

class UserActiveMiddleware
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
		$user = Auth::user();
		if ($user && $user->isActive()) {
			return $next($request);
		}

		return $request->ajax()
			? response('Unauthorized', 403)
			: back()->with('error', 'Inactive accounts cannot perform that action');
    }
}
