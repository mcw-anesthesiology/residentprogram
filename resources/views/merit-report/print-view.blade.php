@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-merit-reports.css') }}" />
@endpush

@section('blockless-body')
	<p>
		@{{ yo }}
	</p>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-merit-reports.js') }}"></script>
	<script>
		createMeritReportPrintView('main');
	</script>
@endpush
