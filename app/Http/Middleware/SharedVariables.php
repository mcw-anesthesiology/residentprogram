<?php

namespace App\Http\Middleware;

use Closure;
use View;
use Auth;

use App\User;

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
        View::share("user", Auth::user());

        if(Auth::user()->type == "admin")
            View::share("residents", User::where("type", "resident")->orderBy("last_name")->get());

        return $next($request);
    }
}
