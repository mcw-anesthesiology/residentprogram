<p>
	Dear Dr. {{ $firstName }} {{ $lastName }}
</p>
<p>
	A new resident user account has been created for you on the resident evaluation system, ResidentProgram.com. We hope you find the system simple and easy to use.
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
		<tr>
			<td>Password</td>
			<td>{{ $password }}</td>
		</tr>
	</tbody>
</table>
<p>
	To request an evaluation from a faculty member, click <a href="{{ url("/request") }}">Request Evaluation</a> in the navbar. By selecting
</p>
<p>
	We strongly recommend you change your password immediately after logging in for the first time. You can do so via the <a href="{{ url("/user") }}">account management page</a>, which can be found by clicking on your name in the navigation bar in the upper right.
</p>
<p>
	If you ever encounter any issues or have any questions about the system, please let me know. You can contact me through the <a href="{{ url("/contact") }}">contact page</a>, or by emailing me directly at <a href="mailto:jmischka@mcw.edu">jmischka@mcw.edu</a>.
</p>
