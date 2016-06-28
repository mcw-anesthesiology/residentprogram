<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Log;

use App\Alum;

class UpdateAlumMiddleware
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
			$update_hash = $request->route()->parameters()["hash"];
			if(Alum::where("update_hash", $update_hash)->count() > 0)
				return $next($request);
		} catch(\Exception $e){
			Log::error($e);
		}

		if($request->ajax())
			return response('Unauthorized.', 401);
		else
			return redirect("/login");
    }
}
