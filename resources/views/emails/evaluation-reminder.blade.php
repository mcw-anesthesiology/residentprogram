<style>
	.eval-link-container {
		padding-left: 2em;
	}
</style>

<h1>Hello Dr. {{ $evaluation->evaluator->last_name }},</h1>

<p>
	Please complete the following evaluation as soon as possible:
</p>
<p class="eval-link-container">
	<a href="{{ url($evaluation->completion_url) }}">
		Dr. {{ $evaluation->subject->full_name }}
		— {{ $evaluation->form->title }}
	</a>

	@if($evaluation->has_valid_hash_link && !empty($evaluation->hash_expires))
		. This link will expire
		{{ $evaluation->hash_expires }}
	@endif
</p>
<p>
	This reminder was sent by an administrator.
</p>
<p>
	As always, if you have any questions or comments about the system, you can
	contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at
	<a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
