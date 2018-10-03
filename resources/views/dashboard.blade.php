@extends('app')

@push('stylesheets')
<link rel="stylesheet" href="{{ elixir('css/dashboard.css') }}" />
@endpush

@section('main')
@verbatim
	<div class="container body-block">
		<div v-if="subjectEvaluations">
			<h2>My evaluations</h2>
			<subject-evaluations-block :evaluations="subjectEvaluations"></subject-evaluations-block>
		</div>
		<div v-if="evaluatorEvaluations">
			<h2>Evaluations I completed</h2>
			<evaluator-evaluations-block :evaluations="evaluatorEvaluations"></evaluator-evaluations-block>
		</div>
	</div>

@endverbatim
@endsection

@push('scripts')
	<script src="{{ elixir('js/dashboard.js') }}"></script>
@endpush
