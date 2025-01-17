<?php

namespace App\Exceptions;

use Exception;
use Psr\Log\LoggerInterface;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Validation\ValidationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

use Illuminate\Session\TokenMismatchException;
use App\Http\Middleware\ApiTokenMismatchException;

use Auth;
use Log;


class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthenticationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
		TokenMismatchException::class
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
		if ($this->shouldReport($e)) {

			try {
	            $logger = $this->container->make(LoggerInterface::class);

				$context = [];
				if(Auth::check()){
					$context['person'] = [
						'id' => Auth::user()->id,
						'username' => Auth::user()->username,
						'email' => Auth::user()->email
					];
				}

				$logger->error($e, $context);
	        } catch (Exception $ex) {
	            throw $e; // throw the original exception
	        }
        }
    }

	/**
	 * Convert an authentication exception into an unauthenticated response.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Illuminate\Auth\AuthenticationException  $exception
	 * @return \Illuminate\Http\Response
	 */
	protected function unauthenticated($request, AuthenticationException $exception)
	{
	    if ($request->expectsJson()) {
	        return response()->json(['error' => 'Unauthenticated.'], 401);
	    }

	    return redirect()->guest('login');
	}
}
