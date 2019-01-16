<style>
	th, td {
		padding: 0.5em;
	}

	th {
		text-align: left;
	}
</style>

<p>
	Dear {{ $firstName }} {{ $lastName }},
</p>

<p>
	An account has been created for you on ResidentProgram.com, the departmental trainee
	and faculty evaluation system.
</p>

<p>
	Please use the email address
@if (!config('app.external_auth') && !empty($password))
	and temporary password
@endif
	below to log into the site.
@if (!config('app.external_auth') && !empty($password))
	Once you have successfully logged in, we strongly recommend that you
	change your password to something that is easier to remember. You can do that
	here: <a href="{{ url('/user') }}">{{ url('/user') }}</a>.
@endif
</p>

<table>
	<thead>
		<tr>
			<th>{{ env('APP_URL') }}</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Email address</th>
			<td>
				<kbd>{{ $email }}</kbd>
			</td>
		</tr>
@if (!config('app.external_auth') && !empty($password))
		<tr>
			<th>Password</th>
			<td>
				<kbd>{{ $password }}</kbd>
			</td>
		</tr>
@endif
	</tbody>
</table>

<p><b>On Resident Program, you can:</b></p>

<ul>
@if ($userType == 'resident' || $userType == 'fellow')
	<li>Request evaluations</li>
	<li>Create, save, and submit faculty evaluations</li>
	<li>Review completed evaluations</li>
@elseif ($userType == 'faculty' || $userType == 'staff')
	<li>Create or complete requested trainee evaluations</li>
	<li>View your own or your mentee's evaluations</li>
	<li>Create, save, and submit yearly Merit checklists</li>
@elseif ($userType == 'admin')
	<li>Manage users, evaluations, forms, and most other features of the site</li>
	<li>Request evaluations on behalf of others</li>
	<li>Review completed evaluations</li>
	<li>A lot of other things!</li>
@endif
</ul>

<p>
	You can find more information about Resident Program here:
	<a href="{{ url('/help') }}">{{ url('/help') }}</a>.
</p>


<h2>Contact us</h2>

<p>Please contact us with any technical issues, or with suggestions you have for either site.</p>

<p>
	Jacob Mischka, Programmer Analyst:
	<a href="mailto:{{ config('app.admin_email') }}">{{ config('app.admin_email') }}</a>.
</p>

<p>Thank you and welcome!</p>
