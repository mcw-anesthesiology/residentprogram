<style>
	p {
		margin-bottom: 1.5em;
	}

	.link-container {
		padding: 2em;
	}
</style>

<h1>Hello {{ $title }} {{ $last_name }}!</h1>
<p>
	A password reset has been requested for your Resident Program account.
</p>
<p>
	If you made this request, please create a new password using the link below:
</p>
<p class="link-container">
	<a href="{{ url("password/reset/".$token) }}">{{ url("password/reset/".$token) }}</a>
</p>
<p>
	If you did not make this request, you can safely ignore this email.
</p>
<p>
	As always, if you have any questions please contact me at
	<a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
<p>
	Thank you!
</p>
