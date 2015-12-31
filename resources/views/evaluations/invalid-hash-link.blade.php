@extends("app")

@section("body")
	<h1 class="header">Invalid evaluation link</h1>
	<p>
		It looks like the evaluation link you've tried using doesn't exist or is no longer valid. This could mean the evaluation has already been completed, or that the link has expired.
	</p>
	<p>
		If you believe this is a mistake, or if you have any questions, please contact me at <a href="mailto:{{ env('ADMIN_EMAIL') }}">{{ env('ADMIN_EMAIL') }}</a>.
	</p>
@stop
