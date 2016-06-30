<p>
	Dear Dr. {{ $firstName }} {{ $lastName }}
</p>
<p>
	Your {{ $userType }} user account is available for you on the trainee evaluation system, ResidentProgram.com. We hope you find the system simple and easy to use.
</p>
<table>
	<thead>
		<tr>
			<th>www.residentprogram.com</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Username</th>
			<td>{{ $username }}</td>
		</tr>
@if(!empty($password))
		<tr>
			<th>Password</th>
			<td>{{ $password }}</td>
		</tr>
@endif
	</tbody>
</table>
@include("help.".$userType)
