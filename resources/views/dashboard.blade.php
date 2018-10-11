@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/dashboard.css') }}" />
		<style>
			.dashboard-welcome-alert p {
				margin-bottom: 1em;
			}

			.dashboard-welcome-alert .btn {
				white-space: normal;
			}
		</style>
@endpush

@section('main')
	<div class="container body-block">
		<h1>Resident Program</h1>

		<div class="alert alert-info dashboard-welcome-alert">
			<p class="lead">
				Welcome to the new dashboard!
			</p>
			<p>
				The new dashboard is intended to be a more streamlined and fluid experience.
				It is, however, a work in progress, so please don't be surprised if things continue to change.
			</p>

			<p>
				If the new dashboard is missing something you need (or if
				something isn't working correctly), you can
				<a href="/dashboard/old" class="alert-link">access the old one here</a>.
				If you find yourself doing so, Please let me know which
				features are missing from the new version via the
				<a href="/contact" class="alert-link">contact page</a> or by emailing me at
				<a href="mailto:{{ config('app.admin_email') }}" class="alert-link">{{ config('app.admin_email') }}</a>
				so I can fix the new one.
			</p>

			<p>
				Please get in touch if you have any feedback or suggestions as this process continues!
			</p>

			<div class="text-right">
				<a href="/dashboard/old" class="btn btn-info">
					Take me to the old dashboard instead
				</a>
			</div>
		</div>

		<start-end-date v-model="dates"></start-end-date>

		<nav v-cloak>
			<ul class="nav nav-pills">
				<router-link tag="li" to="/" active-class="active" exact>
					<a>
						Home
					</a>
				</router-link>
				<router-link v-if="mentees.length" tag="li" to="/mentees" active-class="active">
					<a>
						Mentees
					</a>
				</router-link>
				<router-link v-if="programs.length" tag="li" to="/programs" active-class="active">
					<a>
						Programs
					</a>
				</router-link>
			</ul>
		</nav>
	</div>

	<router-view :dates="dates"></router-view>
@endsection

@push('scripts')
	<script src="{{ elixir('js/dashboard.js') }}"></script>
@endpush
