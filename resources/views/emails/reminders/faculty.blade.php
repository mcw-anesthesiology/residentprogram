<p>Hello Dr {{ $emailUser->last_name }}!</p>

<p>
	This is your {{ $frequency }} reminder from ResidentProgram.com.
</p>

<p>
	You currently have <b>{{ $numPending > 0 ? $numPending : 'no' }}</b> pending trainee evaluation
	{{ $numPending == 1 ? 'request' : 'requests' }}.
</p>

@if($numPending > 0)

<dl>
	@foreach(array_keys($pendingEvals) as $evalType)
		@if($evalType != 'total' && $pendingEvals[$evalType]->count() > 0)
	<dt>
		{{ $pendingEvals[$evalType]->count() }}
		{{ ucfirst($evalType) }}
		{{ $pendingEvals[$evalType]->count() == 1 ? 'evaluation' : 'evaluations' }}:
	</dt>
	<dd>
		<ul>
			@foreach($pendingEvals[$evalType] as $eval)
			<li>
				<a href="{{ url("/evaluation/{$eval->id}") }}">
					Dr. {{ $eval->subject->full_name }} —
					{{ $eval->form->title }}
				</a>
			</li>
			@endforeach
		</ul>
	</dd>
		@endif
	@endforeach
</dl>

<p>
	If there is a problem with any of the above evaluations, or if you feel any
	of them should be removed or changed, you may flag the evaluation
	for administrator review from the evaluation completion page.
</p>

@endif

<p>
	Please consider completing evaluations for trainees that you have
	worked with in the recently completed 4 week academic block.
</p>

<p>
	If you would like to change the frequency of these reminders, you can do so
	via the <a href="{{ url("/user") }}">account management page</a>.

@if ($numPending == 0)
	If you would like to receive these notifications only when you have requests pending,
	please select <b>Only send reminders if I have pending evaluations</b>.
@endif

</p>

<p>
	As always, if you have any questions or comments about the system you can
	contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at
	<a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
</p>

<p>
	Thank you!
</p>
