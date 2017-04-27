@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<merit-compensation-report v-if="meritCompensationReport"
			v-bind="meritCompensationReport"
			@input="handleReportInput"
			@submit="handleSubmit">
		</merit-compensation-report>
		
		<div class="btn-lg-submit-container">
			<button type="button" class="btn btn-lg btn-primary"
					@click="addMeritReport">
				Complete merit report
			</button>
		</div>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-merit-reports.js') }}"></script>
	<script>
		var propsData = {
			meritReportTypes: {!! json_encode($meritReportTypes) !!},
			meritReportTypeForms: {!! json_encode($meritReportTypeForms) !!}
		};
		
		createFacultyMeritReports('main', propsData);
	</script>
@endpush
