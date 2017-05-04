@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<h1 class="sub-header">Faculty 360 Form Builder</h1>
		<form-builder :fixed-form-type="true"
			@submit="handleSubmit">
		</form-builder>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-faculty360.js') }}"></script>
	<script>
		createFaculty360CreateForm('main');
	</script>
@endpush
