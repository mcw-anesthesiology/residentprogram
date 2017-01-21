<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Lang;
use Rate;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }
	
	/**
	 * @Override AuthenticatesUsers
	 */
	public function username(){
		return 'username';
	}
	
	/**
	 * @Override AuthenticatesUsers
	 */
	protected function credentials(Request $request){
		return $request->only($this->username(), 'password') + ['status' => 'active'];
	}
	
	/**
	 * @Override AuthenticatesUsers
	 */
	protected function sendFailedLoginResponse(Request $request){
		$attempts = $this->limiter()->attempts(
			$this->throttleKey($request)
		);
		
		$error = Lang::get('auth.failed');
		
        if($attempts <= 1)
            $error .= ' ' . Lang::get('auth.failed-multiple');
		
        return redirect()->back()
            ->withInput($request->only($this->username(), 'remember'))
            ->with([
                'error' => $error
            ]);
    }
}
