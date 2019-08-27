<style>
	.eval-link-container {
		padding-left: 2em;
	}

	.request-note-container {
		padding: 2em;
	}

	.evaluation-request-note div {
		padding: 2em;
		border-radius: 4px;
		background-color: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>

<h1>Hello Dr. {{ $evaluation->evaluator->last_name }},</h1>

<p>
	You have received a new evaluation request,
	please complete it at your earliest convenience:
</p>
<p class="eval-link-container">
	<a href="{{ url($evaluation->completion_url) }}">
		Dr. {{ $evaluation->subject->full_name }}
		— {{ $evaluation->form->title }}
	</a>
</p>

@if($evaluation->has_valid_hash_link && !empty($evaluation->hash_expires))
	<p>
		This link will expire
		<b>{{ $evaluation->hash_expires }}</b>.
	</p>
@endif

@if(!empty($evaluation->request_note))
<div class="request-note-container">
	<p>
		<i>
			Note from requestor
			({{ $evaluation->requestor->first_name }} {{$evaluation->requestor->last_name}}):
		</i>
	</p>

	<blockquote class="evaluation-request-note">
		<div>{!! $evaluation->request_note !!}</div>
	</blockquote>
</div>
@endif

<p>
	As always, if you have any questions or comments about the system, you can
	contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at
	<a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>
<p>
	If you would like to unsubscribe from these notifications, you can do so
	via the <a href="{{ url("/user") }}">account management page</a>.
</p>
