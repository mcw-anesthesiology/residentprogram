@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-programs.css') }}" />
@endpush

@section('blockless-body')
	<programs-dashboard></programs-dashboard>
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-programs.js') }}"></script>
	<script>
		createProgramsDashboard('main');
	</script>
@endpush
