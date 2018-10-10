@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/dashboard.css') }}" />
@endpush

@section('main')
	<div class="container body-block">
		<h1>Dashboard</h1>

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
			</ul>
		</nav>
	</div>

	<router-view :dates="dates"></router-view>
@endsection

@push('scripts')
	<script src="{{ elixir('js/dashboard.js') }}"></script>
@endpush
