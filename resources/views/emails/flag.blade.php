<p>
	{{ $flaggerName }} has flagged <a href="{{ url('evaluation/'.$evaluationId) }}">evaluation {{ $evaluationId }}</a>.
</p>

<p>
	<b>Requested action: </b>{{ $requestedAction }}
</p>

<p>
	<b>Reason: </b>{{ $reason }}
</p>

<p>
	<b>Sent at: </b>{{ $now }}
</p>
