<p>
	You have requested to complete
	<a href="{{ url("/faculty360/evaluate/".$evaluationHash) }}">
		a Faculty 360 evaluation for Dr. {{ $subjectLast }}
	</a>
</p>
<p>
	This link will expire <b>{{ $hashExpires }}</b>.
</p>
<p>
	When completing an evaluation, required questions are marked with a
	<span style="color: blue;">blue</span> border.
	Question options may have descriptions, which you can view by
	hovering your mouse cursor over the options, or by clicking the
	<i>Show Descriptions</i> button for the question.
	You may save your responses to complete later by pressing the save
	button, and complete the evaluation with the submit button.
</p>
<p>
	If you have any questions or comments about the system, you can
	contact me directly at
	<a href="mailto:{{ config("app.admin_email") }}">
		{{ config("app.admin_email") }}
	</a>.
</p>
<p>
	Thank you!
</p>
