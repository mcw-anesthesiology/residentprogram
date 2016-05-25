@extends("app")

@section("body")
	<h1 class="header">Invalid Alumni Link</h1>
	<p>
		It looks like the alumni link you've tried using doesn't exist or is no longer valid.
		Please try again with the link you were given.
	</p>
	<p>
		If this continues or if you believe this is an error, please let me know at
		<a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a> and we will get it resolved.
	</p>
	<p>
		Thank you!
	</p>
@stop
