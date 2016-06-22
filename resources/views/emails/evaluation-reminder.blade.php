<h3>Hello Dr. {{ $evaluatorLast }},</h3>

<p>
	Please complete the following evaluation as soon as possible: <a href="{{ url("/evaluation/".$evaluationId) }}">Dr. {{ $subjectLast }}, {{ $formTitle }}</a>
</p>
<p>
	This reminder was sent by an administrator.
</p>
<p>
	As always, if you have any questions or comments about the system, you can contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
