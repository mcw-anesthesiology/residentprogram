<p>
	Dear Dr. {{ $firstName }} {{ $lastName }}
</p>
<p>
	A new {{ $userType }} user account has been created for you on the resident evaluation system, ResidentProgram.com. We hope you find the system simple and easy to use.
</p>
<table>
	<thead>
		<tr>
			<td>www.residentprogram.com</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Username</td>
			<td>{{ $username }}</td>
		</tr>
@if(!empty($password))
		<tr>
			<td>Password</td>
			<td>{{ $password }}</td>
		</tr>
@endif
	</tbody>
</table>
@include("help.".$userType)
