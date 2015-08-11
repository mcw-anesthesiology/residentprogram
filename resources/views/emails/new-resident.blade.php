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
	The <a href="{{ url("/dashboard") }}">dashboard</a> will allow you to view evaluation results, check the status of evaluation requests, and cancel evaluations requested in error.
</p>
<p>
	To request an evaluation from a faculty member, click <a href="{{ url("/request") }}">Request Evaluation</a> in the navbar. Selecting a block will provide you with faculty members to choose from that were scheduled to work in the same locations as you, however you may also select from the list of all faculty members.
</p>
<p>
	You may generate a report for yourself by selecting Generate Specific in the Reports dropdown, where you can see how your evaluations compare to the average of all others in the selected date range and training level.
</p>
<p>
	We strongly recommend you change your password immediately after logging in for the first time. You can do so via the <a href="{{ url("/user") }}">account management page</a>, which can be found by clicking on your name in the navigation bar in the upper right.
</p>
<p>
	If you ever encounter any issues or have any questions about the system, please let me know. You can contact me through the <a href="{{ url("/contact") }}">contact page</a>, or by emailing me directly at <a href="mailto:{{ env('ADMIN_EMAIL') }}">{{ env('ADMIN_EMAIL') }}</a>.
</p>
