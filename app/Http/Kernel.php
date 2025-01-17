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
    ];

	/**
	 * The application's route middleware groups.
	 *
	 * @var array
	 */
	protected $middlewareGroups = [
		'web' => [
			\App\Http\Middleware\EncryptCookies::class,
			\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
			\Illuminate\Session\Middleware\StartSession::class,
			\Illuminate\View\Middleware\ShareErrorsFromSession::class,
			\App\Http\Middleware\VerifyCsrfToken::class,
			\Illuminate\Routing\Middleware\SubstituteBindings::class,
		],

		'api' => [
			'bindings',
		],

		'gql' => [
			\App\Http\Middleware\EncryptCookies::class,
			\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
			\App\Http\Middleware\StartSession::class
		]
	];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,

		'case-log.has-access' => \App\Http\Middleware\CaseLogHasAccess::class,
		'evaluation.requestor' => \App\Http\Middleware\EvaluationRequestor::class,
		'evaluation.evaluator' => \App\Http\Middleware\EvaluationEvaluator::class,
		'evaluation.user-edit' => \App\Http\Middleware\EvaluationUserEdit::class,
		'shared' => \App\Http\Middleware\SharedVariables::class,
		'site-feature' => \App\Http\Middleware\SiteFeature::class,
		'type' => \App\Http\Middleware\Type::class,
		'update.alum' => \App\Http\Middleware\UpdateAlumMiddleware::class,
		'has-role' => \App\Http\Middleware\UserHasRole::class,
		'active' => \App\Http\Middleware\UserActiveMiddleware::class
    ];
}
