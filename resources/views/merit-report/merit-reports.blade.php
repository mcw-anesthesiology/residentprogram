@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir("css/vue-merit-reports.css") }}" />
@endpush

@section('blockless-body')
	@if($user->isType('admin') || $user->usesFeature('FACULTY_EVALS'))
		@include("merit-report.admin-supervisor")
	@endif

	@if($user->isType('faculty'))
		@include('merit-report.faculty')
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
	</script>
@endpush
