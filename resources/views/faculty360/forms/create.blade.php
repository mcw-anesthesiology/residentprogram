@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-faculty360.css') }}" />
@endpush

@section('blockless-body')
	<div class="container body-block">
		<div v-if="newFormId" v-cloak>
			<p class="lead">
				Form saved successfully! Redirecting to
				<a :href="`/faculty360/forms/${newFormId}/view`">
					new form
				</a>
			</p>
		</div>
		<div v-else>
			<h1 class="sub-header">Faculty 360 Form Builder</h1>
			<form-builder fixed-form-type="faculty360"
				default-period-type="year"
				:show-milestones-competencies="false"
				@submit="handleSubmit">
			</form-builder>
		</div>

		<alert-list v-model="alerts"></alert-list>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-faculty360.js') }}"></script>
	<script>
		createFaculty360CreateForm('main');
	</script>
@endpush
