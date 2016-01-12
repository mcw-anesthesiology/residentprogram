<p>
	A password reset has been requested for your account. If you made this request, please visit this page. Do not share this link with anyone.
</p>
<p>
	<a href="{{ url("password/reset/".$token) }}">{{ url("password/reset/".$token) }}</a>
</p>
<p>
	As always, if you have any questions please contact me at <a href="mailto:{{ config("admin_email") }}">{{ config("admin_email") }}</a>.
</p>
