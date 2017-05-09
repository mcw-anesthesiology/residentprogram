@extends('app')

@section('blockless-body')
	<div v-if="show.createForm" v-cloak class="container body-block">
		<h2>
			Create form
		</h2>
		<form-builder :old-form-contents="formToEdit"
			fixed-form-type="faculty360"
			default-period-type="year"
			@submit="handleFormSubmit">
		</form-builder>
		<div class="text-center">
			<button type="button" class="btn btn-default"
					@click="show.createForm = false">
				Cancel
			</button>
		</div>
	</div>

	<div id="faculty-360-forms-block" class="container body-block">
		<h2 class="sub-header">
			Faculty 360 forms
			<button type="button" class="btn btn-success btn-xs"
					@click="show.createForm = true">
				<span class="glyphicon glyphicon-plus"></span>
				Add new
			</a>
		</h2>
		<data-table v-if="forms"
			:thead="formsThead" :config="formsConfig" :data="forms">
		</data-table>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageFaculty360('main');
	</script>
@endpush
