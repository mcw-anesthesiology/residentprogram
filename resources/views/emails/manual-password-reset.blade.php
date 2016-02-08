<h3>Dr. {{ $lastName }}</h3>
<p>
	A password reset has been requested for your account, you've been given a temporary password.
</p>
<table>
	<thead>
		<tr>
			<td colspan="2">{{ url("/") }}</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Password</th>
			<td>{{ $password }}</td>
		</tr>
	</tbody>
</table>
<p>
	We strongly recommend you change your password immediately after successfully logging in. You can do so via the <a href="{{ url("/user") }}">account management page</a>, which can be found by clicking on your name in the navigation bar in the upper right.
</p>
<p>
	As always, you can contact me through the <a href="{{ url("/contact") }}">contact page</a>, or by emailing me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
