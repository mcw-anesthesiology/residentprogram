<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class UseApiAuthGuard
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
		Auth::shouldUse('api');

        return $next($request);
    }
}
