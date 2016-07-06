<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

use App\Evaluation;

class CancelEvaluation
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
		$eval = Evaluation::find($request->route()->parameters()["id"]);
		if($eval->requested_by_id == $user->id)
			return $next($request);

		if($request->ajax())
			return response('Unauthorized.', 401);
		else
			return redirect("/login");
    }
}
