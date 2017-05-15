@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-faculty360.css') }}" />
@endpush

@section('blockless-body')
	<div class="container body-block">
		<p v-show="false" class="lead">
			Loading...
		</p>
		<form-reader v-bind="evaluation" :title="evaluation.form.title" readonly>
		</form-reader>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-faculty360.js') }}"></script>
	<script>
		var propsData = {
			evaluation: {!! $evaluation->toJson() !!}
		};

		createFaculty360ViewEvaluation('main', propsData);
	</script>
@endpush
