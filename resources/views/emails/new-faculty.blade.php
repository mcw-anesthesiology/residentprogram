<p>
	Dear Dr. {{ $firstName }} {{ $lastName }}
</p>
<p>
	A new faculty user account has been created for you on the resident evaluation system, ResidentProgram.com. We hope you find the system simple and easy to use.
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
	The <a href="{{ url("/dashboard") }}">dashboard</a> will allow you to view all pending and saved evaluation requests, review completed evaluations, and cancel evaluations created in error.
</p>
<p>
	To create a new evaluation, click <a href="{{ url("/request") }}">Create Evaluation</a> in the navbar. Selecting a block will provide you with interns, residents, and fellows to choose from that were scheduled to work in the same locations as you, however you may also select from the list of all interns, residents, and fellows.
</p>
<p>
	When completing an evaluation, required questions are marked with a <span style="color: red;">red</span> question number. Question options may have descriptions, which you can view by hovering your mouse cursor over the radio buttons, or by clicking the Show Descriptions button for the question. You may save your responses to complete later by pressing the save button, and complete the evaluation with the submit button.
</p>
<p>
	If you are a mentor, you can see evaluations for your mentees on your dashboard, and you can also generate a report for them by selecting Generate Specific in the Reports dropdown. This report will allow you to see how your mentee's evaluations compare to the average of all others in the selected date range and training level.
</p>
<p>
	We strongly recommend you change your password immediately after logging in for the first time. You can do so via the <a href="{{ url("/user") }}">account management page</a>, which can be found by clicking on your name in the navigation bar in the upper right. Here you can also customize notification and reminder email preferences.
</p>
<p>
	If you ever encounter any issues or have any questions about the system, please let me know. You can contact me through the <a href="{{ url("/contact") }}">contact page</a>, or by emailing me directly at <a href="mailto:{{ env('ADMIN_EMAIL') }}">{{ env('ADMIN_EMAIL') }}</a>.
</p>
