<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class Type
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $type)
    {
		if (!Auth::user()->isType($type)) {
			return $request->ajax()
				? response('Unauthorized', 403)
				: redirect("dashboard")->with("error", "You do not have permission to access that page");
		}

        return $next($request);
    }
}
