@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/dashboard.css') }}" />
	<style>
		h2 {
			margin-top: 2em;
		}
	</style>
@endpush

@section('main')
@verbatim
	<div class="container body-block">
		<h1>Dashboard</h1>

		<start-end-date v-model="dates"></start-end-date>

		<div v-if="subjectEvaluations">
			<h2>
				My evaluations
				<button type="button" class="btn btn-sm btn-default" @click="$store.dispatch('evaluations/subject/fetch', dates)">
					<span class="glyphicon glyphicon-refresh"></span>
				</button>
			</h2>
			<subject-evaluations-block :evaluations="subjectEvaluations"></subject-evaluations-block>
		</div>

		<div v-if="evaluatorEvaluations">
			<h2>
				Evaluations for me to complete
				<button type="button" class="btn btn-sm btn-default" @click="$store.dispatch('evaluations/evaluator/fetch', dates)">
					<span class="glyphicon glyphicon-refresh"></span>
				</button>
			</h2>
			<evaluator-evaluations-block :evaluations="evaluatorEvaluations"></evaluator-evaluations-block>
		</div>
	</div>

@endverbatim
@endsection

@push('scripts')
	<script src="{{ elixir('js/dashboard.js') }}"></script>
@endpush
