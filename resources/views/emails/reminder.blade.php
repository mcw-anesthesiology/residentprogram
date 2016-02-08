<h3>Hello!</h3>
<p>
	This is your {{ $frequency }} reminder from ResidentProgram.com.
</p>

<p>
	You currently have <b>{{ $numPending }}</b> pending evaluation requests from residents or fellows.
</p>

<p>
	Please consider completing evaluations for trainees that you have worked with in the recently completed 4 week academic block.
	A list of people you may have worked with should be available upon selection of a block when <a href="{{ url("/request") }}">creating an evaluation</a>, or you can select from the entire list.
</p>

<p>
	If you would like to change the frequency of these reminders, you can do so via the <a href="{{ url("/user") }}">account management page</a>.
</p>

<p>
	As always, if you have any questions or comments about the system, you can contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
