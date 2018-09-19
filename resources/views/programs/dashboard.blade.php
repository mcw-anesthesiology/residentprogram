@extends('app')

@section('blockless-body')
	<h1>Programs</h1>

	<programs-dashboard></programs-dashboard>
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-programs.js') }}"></script>
	<script>
		createProgramsDashboard('main');
	</script>
@endpush
