@extends("app")

@section("blockless-body")
	@include("dashboard.faculty." . $user->type)
@stop

