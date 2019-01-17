@extends('app')

@section('body')
	<h1>Help</h1>

	@include("help.{$user->specific_type}")

	@if (config('features.faculty_merit'))
		@include('help.merit')
	@endif
@endsection
