@extends('app')

@section('head')
	<style>
		.landing {
			font-size: 1.5em;
			padding: 2em;
		}
	</style>
@stop

@section('body')
	<div class="landing">
		<p class="lead">
			Sorry, we couldn't find any evaluations for the given identifier.
			The evaluation may be completed, or the completion link may have expired.
		</p>
		<p class="lead">
			If you believe this is an error, please contact me at
			<a href="mailto:{{ config('app.admin_email') }}">
				{{ config('app.admin_email') }}
			</a>
		</p>
	</div>
@stop
