<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        "type" => \App\Http\Middleware\Type::class,
        "shared" => \App\Http\Middleware\SharedVariables::class,
		"update.alum" => \App\Http\Middleware\UpdateAlumMiddleware::class,
		"evaluation.requestor" => \App\Http\Middleware\EvaluationRequestor::class,
		"evaluation.evaluator" => \App\Http\Middleware\EvaluationEvaluator::class,
		"evaluation.user-edit" => \App\Http\Middleware\EvaluationUserEdit::class
    ];
}
