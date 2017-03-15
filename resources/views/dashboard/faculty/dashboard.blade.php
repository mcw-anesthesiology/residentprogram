@extends("app")

@section("blockless-body")
	@include("dashboard.faculty." . $user->type)
@stop

@section("script")
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-dashboard.js') }}"></script>
@stop
