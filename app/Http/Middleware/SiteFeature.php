<?php

namespace App\Http\Middleware;

use Closure;

class SiteFeature
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $feature)
    {
		if (config("features.{$feature}")) {
			return $next($request);
		}

		return $request->ajax()
            ? response('Feature not enabled', 403)
            : redirect('/');
    }
}
