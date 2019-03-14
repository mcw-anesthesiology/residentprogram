@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ mix('dashboard.css') }}" />
@endpush
@push('styles')
	<style>
		.dashboard-welcome-alert p {
			margin-bottom: 1em;
		}

		.dashboard-welcome-alert .btn {
			white-space: normal;
		}

		.date-range-hint {
			display: block;
			margin-bottom: 2em;
			opacity: 0.85;
		}

		.date-range-hint b {
			color: #333;
		}

		.link-container {
			margin: 1em;
		}
	</style>
@endpush

@section('main')
	<div class="container body-block">
		<h1>Resident Program</h1>

		<div class="link-container">
			<a href="/dashboard/old" class="btn btn-info">
				Take me to the old dashboard view
			</a>
		</div>

		<div v-cloak>
			<start-end-date v-model="dates"></start-end-date>
			<small class="date-range-hint">
				<b>Hint:</b>
				You can change the default range from the
				<a href="/user">user settings page</a>
			</small>

			<nav v-if="mentees.length || programs.length">
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
	</div>

	<div class="container">
		<stored-alert-list></stored-alert-list>
	</div>

	<router-view :dates="dates"></router-view>
@endsection

@push('scripts')
	<script src="{{ mix('dashboard.js') }}"></script>
@endpush
