@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-faculty360.css') }}" />
@endpush

@section('blockless-body')
	<div class="container body-block">
		<form-reader v-bind="form" readonly>
		</form-reader>

		<alert-list v-model="alerts"></alert-list>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-faculty360.js') }}"></script>
	<script>
		var propsData = {
			form: {!! $form->toJson() !!}
		};

		createFaculty360ViewForm('main', propsData);
	</script>
@endpush
