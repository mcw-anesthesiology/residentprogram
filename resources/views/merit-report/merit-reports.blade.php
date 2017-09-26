@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir("css/vue-merit-reports.css") }}" />
@endpush

@section('blockless-body')
	<router-view :user="user"
		title="hm"
		:current-user="user"
		:merit-reports="meritReports"
		:merit-forms="meritForms"
		:merit-report-types="meritReportTypes"
		:merit-report-type-forms="meritReportTypeForms"
		@close="handleClose"
		@reload="handleReload"
		@alert="alerts.push(arguments[0])">
	</router-view>

	@if($user->isType('faculty'))
		@include('merit-report.faculty')
	@endif

	@if($user->isType('admin') || $user->usesFeature('FACULTY_MERIT'))
		@include("merit-report.admin-supervisor")
	@endif
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

		createMeritReportsHub('main', propsData);
	</script>
@endpush
