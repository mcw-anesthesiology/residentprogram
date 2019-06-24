<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use GuzzleHttp;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\User;

use Auth;
use Lang;
use Log;
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
	public function username() {
		return 'username';
	}

	/**
	 * @Override AuthenticatesUsers
	 */
	protected function credentials(Request $request){
		$credentials = $request->only('password');

		$login = $request->input($this->username());

		$field = filter_var($login, FILTER_VALIDATE_EMAIL)
			? 'email'
			: $this->username();

		$credentials[$field] = $login;

		return $credentials;
	}

	public function login(Request $request) {
		if (config('auth.external_auth')) {
			try {
				try {

					$client = new GuzzleHttp\Client();
					$response = $client->request('POST', config('auth.external_auth_endpoint'), [
						'http_errors' => false,
						'form_params' => [
							'email' => $request->input($this->username()),
							'password' => $request->input('password')
						]
					]);

					switch ($response->getStatusCode()) {
					case 200:
						$authUser = json_decode($response->getBody());

						$sites = is_array($authUser->sites) ? $authUser->sites : json_decode($authUser->sites);

						if (empty($sites) || !in_array('RESIDENT_PROGRAM', $sites)) {
							throw new \DomainException('User does not have access to Resident Program enabled');
						}

						$user = User::where(['email' => $authUser->email, 'status' => 'active'])->firstOrFail();

						Auth::login($user, true);
						return redirect()->intended('dashboard');
						break;
					case 401:
						$body = json_decode($response->getBody());

						if (!empty($body->message)) {
							return $this->sendFailedLoginResponse($request, $body->message);
						}

						break;
					}
				} catch (\Exception $e) {

					Log::debug('Failed authenticating user, attempting local login');

					if (Auth::attempt($this->credentials($request))) {
						return redirect()->intended('dashboard');
					}

					throw $e;
				}
			} catch (ModelNotFoundException $e) {
				Log::critical('Auth successful but user not found, account must be created');

				return redirect()->back()
					->withInput($request->only($this->username(), 'remember'))
					->with([
						'error' => Lang::get('auth.no-account')
					]);
			} catch (\DomainException $e) {
				Log::critical($e->getMessage());

				return redirect()->back()
					->withInput($request->only($this->username(), 'remember'))
					->with([
						'error' => Lang::get('auth.no-account')
					]);
			}

		} else {
			if (Auth::attempt($this->credentials($request))) {
				return redirect()->intended('dashboard');
			}
		}

		return $this->sendFailedLoginResponse($request);
	}

	/**
	 * @Override AuthenticatesUsers
	 */
	protected function sendFailedLoginResponse(Request $request, $error = null){
		$attempts = $this->limiter()->attempts(
			$this->throttleKey($request)
		);

		if (empty($error)) {
			$error = Lang::get('auth.failed');

			if ($attempts <= 1) {
				$error .= '<br /><br />' . Lang::get('auth.failed-multiple');
			}
		}


        return redirect()->back()
            ->withInput($request->only($this->username(), 'remember'))
            ->with([
                'error' => $error
            ]);
    }

	public function externalLogin(Request $request){
		$this->validateLogin($request);

		if($this->hasTooManyLoginAttempts($request)){
			$this->fireLockoutEvent($request);

			return response()->json([
				'status' => 'failed'
			], 429);
		}

		if($this->attemptLogin($request))
			return response()->json([
				'status' => 'success',
				'user' => $this->guard()->user(),
				'sessionId' => $request->session()->getId()
			]);

		$this->incrementLoginAttempts($request);

		return response()->json([
			'status' => 'failed'
		], 401);
	}
}
