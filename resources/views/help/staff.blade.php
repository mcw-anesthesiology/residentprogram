<h3>Viewing Evaluations</h3>
<p>
	The <a href="{{ url("/dashboard") }}">dashboard</a> will allow you to view all in-progress and completed evaluations.
</p>

<h3>Completing evaluations</h3>
<p>
	Click <a href="{{ url("/request") }}">Create Evaluation</a> in the navbar and select a resident or fellow to evaluate, or select an in-progress evaluation from the <a href="{{ url("/dashboard") }}">dashboard</a>.
</p>
<p>
	When completing an evaluation, required questions are marked with a <span style="color: red;">red</span> question number, text, and border. Question options may have descriptions, which you can view by hovering your mouse cursor over the radio buttons, or by clicking the Show Descriptions button for the question. You may save your responses to complete later by pressing the save button, and complete the evaluation with the submit button.
</p>

<h3>Account Management</h3>
<p>
	We strongly recommend you change your password immediately after logging in for the first time. You can do so via the <a href="{{ url("/user") }}">account management page</a>, which can be found by clicking on your name in the navigation bar in the upper right.
</p>

<h3>Further Help</h3>
<p>
	If you ever encounter any issues or have any questions about the system, please let me know. You can contact me through the <a href="{{ url("/contact") }}">contact page</a>, or by emailing me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
