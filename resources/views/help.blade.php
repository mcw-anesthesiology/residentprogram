@extends('app')

@section('body')
	<h1>Help</h1>

	@include("help.{$user->specific_type}")
@endsection
