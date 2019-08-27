<h3>Hello {{ $evaluatorName }},</h3>
<p>
	You have received a new evaluation request: <a href="{{ url("/evaluate/".$evaluationHash) }}">Dr. {{ $subjectLast }}, {{ $formTitle }}</a>. Please complete it at your earliest convenience. This link will expire <b>{{ $hashExpires }}</b>.
</p>
<p>
	If you have any questions or comments about the system, you can contact me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
