<style>
	.eval-link-container {
		padding-left: 2em;
	}
</style>

<p>
	Hello Dr. {{ $evaluation->subject->last_name }}
</p>

<p>
	An evaluation has just been completed for you:
</p>

<p class="eval-link-container">
	<a href="{{ url("/evaluation/".$evaluation->id) }}">
		{{ $evaluation->form->title }}
		(
			{{ $evaluation->evaluation_date_start->toFormattedDateString() }}
			– {{ $evaluation->evaluation_date_end->toFormattedDateString() }}
		)
	</a>
</p>


<p>
	You're receiving this because you requested to be notified of
	new evaluations. If you no longer want this, please select
	<i>No, don't send me emails</i> on your
	<a href="{{ url("/user") }}">account management page</a>.
</p>

<p>
	As always, if you have any questions or comments about the system, you can
	contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at
	<a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>

<p>
	Thank you!
</p>
