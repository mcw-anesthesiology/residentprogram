<p>
	Hello Dr. {{ $lastName }}
</p>

<p>
	You have {{ $evalsCompleted }} evaluations completed for between {{ $startDate }} and {{ $endDate }}.
</p>

<p>
	You are required to have {{ $evalsRequired }} evaluations completed for this period. Please request at least {{ $evalsNeeded }} more evaluation as soon as possible.
</p>

<p>
	If you have any issues or questions about the system, please contact Jacob Mischka using the <a href="{{ url("/contact") }}">contact page</a> or by email directly at <a href="mailto:{{ config("admin_email") }}">{{ config("admin_email") }}</a>.
</p>

<p>
	Thank you!
</p>
