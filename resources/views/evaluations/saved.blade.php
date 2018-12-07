@extends("app")

@section("body")
	<h1 class="header">Evaluation saved</h1>
	<p>
		Your evaluation has been saved.
	</p>

@if (!empty($evalExpiration))
	<p>
		You can return to the evaluation using the link to complete it before it expires.
		The evaluation link is set to expire on <b>{{ $evalExpiration }}</b>.
	</p>
@endif

@stop
