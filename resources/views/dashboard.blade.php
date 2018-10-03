@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/dashboard.css') }}" />
	<style>
		a.router-link-active {
			opacity: 0.75;
			pointer-events: none;
		}
	</style>
@endpush

@section('main')
	<div class="container body-block">
		<h1>Dashboard</h1>

		<start-end-date v-model="dates"></start-end-date>

		<nav v-cloak>
			<ul>
				<li>
					<router-link to="/">Home</router-link>
				</li>
				<li>
					<router-link to="/mentees">Mentees</router-link>
				</li>
			</ul>
		</nav>
	</div>

	<router-view :dates="dates"></router-view>
@endsection

@push('scripts')
	<script src="{{ elixir('js/dashboard.js') }}"></script>
@endpush
