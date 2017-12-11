<h1>Hello!</h1>

<p>
	In an attempt to provide more feedback to our residents and make it simpler
	for you to complete evaluations, we will be providing a periodic report of
	the residents we believe you worked with the most.
</p>

<p>
	Based on our records, we've selected the following residents as top
	candidates for evaluation for {{ $timePeriodDisplay }}.
</p>

<ol>
@foreach ($pairings as $pairing)
	<li>
		<b>{{ $pairing['resident']->full_name }}</b>
		- {{ $pairing['numCases'] }} totalling
		{{ $pairing['totalTime']->format('%h hours, %i minutes') }}
	</li>
@endforeach
</ol>

<p>
	Please complete evaluations for these residents as soon as possible.
</p>

<p>
	As always, if you have any questions or comments about the site
	please let me know at {{ config('app.admin_email') }} and I'll
	get back to you as soon as possible!
</p>

<p>
	Thank you!
</p>
