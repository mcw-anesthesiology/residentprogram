@extends('app')

@push('stylesheets')
<link rel="stylesheet" href="{{ elixir('css/dashboard.css') }}" />
@endpush

@section('main')
@verbatim
	<div class="container body-block" v-if="subjectEvaluations">
		<h2>My evaluations</h2>
		<evaluation-type-block :evaluations="subjectEvaluations"></evaluation-type-block>
	</div>

	<div class="container body-block" v-if="evaluatorEvaluations">
		<h2>Evaluations I completed</h2>
		<evaluation-type-block :evaluations="evaluatorEvaluations"></evaluation-type-block>
	</div>
@endverbatim
@endsection

@push('scripts')
	<script src="{{ elixir('js/dashboard.js') }}"></script>
@endpush
