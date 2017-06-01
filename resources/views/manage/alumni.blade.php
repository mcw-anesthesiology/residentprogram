@extends("app")

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
@endpush

@section('blockless-body')
	<div id="alumni"></div>
@stop

@section("script")
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageAlumni('#alumni');

		var replacements = [
			"Name",
			"First name",
			"Last name",
			"Update link",
			"Unsub link"
		];
	</script>
@stop
