<h3>Viewing Evaluations</h3>
<p>
	The <a href="{{ url("/dashboard") }}">dashboard</a> will allow you to view evaluation results, check the status of evaluation requests, and cancel evaluations requested in error.
</p>

<h3>Requesting Evaluations</h3>
<p>
	Click <a href="{{ url("/request") }}">Request Evaluation</a> in the navbar. Selecting a block will provide you with faculty members to choose from that were scheduled to work in the same locations as you, however you may also select from the list of all faculty members.
</p>

<h3>Account Management</h3>
<p>
	We strongly recommend you change your password immediately after logging in for the first time. You can do so via the <a href="{{ url("/user") }}">account management page</a>, which can be found by clicking on your name in the navigation bar in the upper right.
</p>

<h3>Further Help</h3>
<p>
	If you ever encounter any issues or have any questions about the system, please let me know. You can contact me through the <a href="{{ url("/contact") }}">contact page</a>, or by emailing me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
