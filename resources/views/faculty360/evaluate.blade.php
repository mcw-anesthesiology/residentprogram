@extends('app')

@section('head')
	<style>
		.landing {
			padding: 2em;
		}
	</style>
@stop

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-faculty360.css') }}" />
@endpush

@section('blockless-body')
	<div class="container body-block">
		<div v-show="false">
			Loading form...
		</div>
		<div v-if="submitSuccessful" v-cloak>
			<p class="lead landing">
				Evaluation submitted successfully, thank you!
			</p>
		</div>
		<form-reader v-else
			:title="evaluation.form.title"
			:contents="contents"
			@input="handleInput"
			@save="handleSave"
			@submit="handleSubmit">
		</form-reader>

		<alert-list v-model="alerts"></alert-list>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-faculty360.js') }}"></script>
	<script>
		var propsData = {
			evaluation: {!! $evaluation->toJson() !!}
		};

		createFaculty360Evaluate('main', propsData);
	</script>
@endpush
