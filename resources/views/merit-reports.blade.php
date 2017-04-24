@extends('app')

@section('blockless-body')
	<div class="body-block">
		<merit-compensation-checklist v-bind="checklist"
			@input="handleInput" @submit="handleSubmit">
		</merit-compensation-checklist>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-merit-reports.js') }}"></script>
	<script>
		createAdminSupervisorMeritReports('main');
	</script>
@endpush
