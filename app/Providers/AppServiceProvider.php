<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Relations\Relation;

use Carbon\Carbon;

use Setting;

class AppServiceProvider extends ServiceProvider {
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {
        Carbon::setToStringFormat("d-M-Y g:i A");
		Schema::defaultStringLength(191);

		// Initialize settings values
		addSettingIfEmpty('facultyEvalThreshold', 3);
		addSettingIfEmpty('facultyEvalTimeThreshold', '3 months ago');
		addSettingIfEmpty('monthlyResidentRequirements.evaluationRequests', 3);
		addSettingIfEmpty('monthlyResidentRequirements.facultyEvaluations', 2);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() {
        if($this->app->environment('production'))
			$this->app->register(\Jenssegers\Rollbar\RollbarServiceProvider::class);
    }
}

function addSettingIfEmpty($key, $value) {
	if (!Setting::has($key)) {
		Setting::set($key, $value);
		Setting::save();
	}
}
