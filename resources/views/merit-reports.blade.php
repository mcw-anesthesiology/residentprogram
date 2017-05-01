@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<merit-compensation-report v-if="meritCompensationReport"
			v-bind="meritCompensationReport"
			:title="yearlyFacultyMeritForm.name"
			@close="handleClose"
			@save="handleSubmit"
			@submit="handleSubmit">
		</merit-compensation-report>
		<template v-else>
			<template v-if="needsToCompleteReport">
				<div class="btn-lg-submit-container">
					<button type="button" class="btn btn-lg btn-primary"
							@click="addMeritReport">
						Complete merit report
					</button>
				</div>			
			</template>
			<template v-else>
				<p>
					You've already completed your merit report for this year. Thanks!
				</p>
				<button type="button" class="btn btn-info center-block"
						@click="viewMostRecentSubmission">
					View your submission
				</button>
			</template>			
		</template>
	</div>
	
	<div class="container body-block">
		<component-list v-if="meritReports" :items="meritReports"
				:fields="meritReportFields"
				:field-accessors="meritReportFieldAccessors"
				default-sort-order="desc">
			<template scope="item">
				<merit-report-list-item v-bind="item" @click="handleViewReport">
				</merit-report-list-item>
			</template>
		</component-list>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-merit-reports.js') }}"></script>
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			meritReportTypes: {!! json_encode($meritReportTypes) !!},
			meritReportTypeForms: {!! json_encode($meritReportTypeForms) !!}
		};
		
		createFacultyMeritReports('main', propsData);
	</script>
@endpush
