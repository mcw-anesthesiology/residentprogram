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
        if(!Auth::user()->isType($type))
            return back();

        return $next($request);
    }
}
