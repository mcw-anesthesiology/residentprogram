@extends("app")

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir("css/vue-reports.css") }}" />
@endpush

@section("blockless-body")
	<div id="reports">
		<div class="text-center">
			<img src="/ajax-loader.gif" alt="" /> Loading
		</div>
	</div>
@stop

@section("script")
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-reports.js') }}"></script>
	<script>
		var vm = createReports('#reports');
	</script>
@stop
