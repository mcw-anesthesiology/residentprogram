<h3>Hello {{ $evaluatorName }},</h3>
<p>
	You have received a new evaluation request: <a href="{{ url("/evaluate/".$evaluationHash) }}">Dr. {{ $subjectLast }}, {{ $formTitle }}</a>. Please complete it at your earliest convenience. This link will expire <b>{{ $hashExpires }}</b>.
</p>
<p>
	When completing an evaluation, required questions are marked with a <span style="color: red;">red</span> question number, text, and border. Question options may have descriptions, which you can view by hovering your mouse cursor over the options, or by clicking the Show Descriptions button for the question. You may save your responses to complete later by pressing the save button, and complete the evaluation with the submit button.
</p>
<p>
	If you have any questions or comments about the system, you can contact me directly at <a href="mailto:{{ config("admin_email") }}">{{ config("admin_email") }}</a>.
</p>
