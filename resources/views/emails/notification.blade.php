<h3>Hello Dr. {{ $evaluatorLast }},</h3>
<p>
	You have received a new evaluation request: <a href="{{ url("/evaluation/".$evaluationId) }}">Dr. {{ $subjectLast }}, {{ $formTitle }}</a>. Please complete it at your earliest convenience.
</p>
<p>
	As always, if you have any questions or comments about the system, you can contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
<p>
	If you would like to unsubscribe from these notifications, you can do so via the <a href="{{ url("/user") }}">account management page</a>.
</p>
