<h3>Viewing Evaluations</h3>
<p>
	The <a href="{{ url("/dashboard") }}">dashboard</a> will allow you to view all evaluations in the system.
</p>

<h3>Requesting Evaluations</h3>
<p>
	To create a new evaluation request, click <a href="{{ url("/request") }}">Request Evaluation</a> in the navbar.
</p>

<h3>Manage</h3>
<ul>
	<li>
		The <a href="{{ url("/manage/evaluations") }}">manage evaluations</a> page will allow you to disable problematic evaluations, as well as cancel incomplete evaluation requests.
	</li>
	<li>
		The <a href="{{ url("/manage/evaluations") }}">manage accounts</a> page will allow you to edit user information and passwords, as well as create new users.
	</li>
	<li>
		The <a href="{{ url("/manage/forms") }}">manage forms</a> page will allow you to create, view, enable, and disable evaluation forms.
	</li>
	<li>
		The <a href="{{ url("/manage/milestones-competencies") }}">manage milestones/competencies</a> page will allow you to view and edit milestones and competencies in the system.
	</li>
	<li>
		The <a href="{{ url("/manage/mentors") }}">manage mentors</a> page will allow you to view, add, and remove mentorships.
	</li>
	<li>
		The <a href="{{ url("/manage/block-assignments") }}">manage block assignments</a> page will allow you to import the block schedule from New Innovations, as well as view the imported schedules.
	</li>
</ul>

<h3>Reports</h3>
<p>There are many different kinds of reports, take a look and run them all from <a href="{{ url('/reports') }}">the reports page</a>.

<h3>Account Management</h3>
<p>
	We strongly recommend you change your password immediately after logging in for the first time. You can do so via the <a href="{{ url("/user") }}">account management page</a>, which can be found by clicking on your name in the navigation bar in the upper right.
</p>

<h3>Further Help</h3>
<p>
	If you ever encounter any issues or have any questions about the system, please let me know. You can contact me through the <a href="{{ url("/contact") }}">contact page</a>, or by emailing me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
