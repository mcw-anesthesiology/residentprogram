@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<form-reader v-bind="form" readonly>
		</form-reader>
		
		<alert-list v-model="alerts"></alert-list>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-faculty360.js') }}"></script>
	<script>
		var propsData = {
			form: {!! $form->toJson() !!}
		};
		
		createViewFaculty360Form('main', propsData);
	</script>
@endpush
