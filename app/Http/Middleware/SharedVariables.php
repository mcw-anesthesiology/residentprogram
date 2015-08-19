<?php

namespace App\Http\Middleware;

use Closure;
use View;
use Auth;

use App\User;
use App\Form;

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

        if(Auth::user()->type == "admin"){
            View::share("residents", User::where("type", "resident")->orderBy("last_name")->get());
            View::share("specificFaculty", User::where("type", "faculty")->orderBy("last_name")->get());
            View::share("facultyForms", Form::where("type", "faculty")->orderBy("title")->get());
        }

        return $next($request);
    }
}
