<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

use App\Evaluation;

class EvaluationEvaluator
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
			$eval = Evaluation::findOrFail($request->route()->parameters()["id"]);
			if($eval->evaluator_id == $user->id || $user->isType("admin"))
				return $next($request);

			throw new \Exception();

		} catch(\Exception $e){
			if($request->ajax())
				return response('Unauthorized.', 401);
			else
				return back()->with("error", "You are not authorized to modify that evaluation");
		}
    }
}
