<h1>Hello!</h1>

<p>
	In an attempt to provide residents more feedback and make it simpler
	for evaluators to complete evaluations, we will be providing a periodic
	report of the faculty we believe you worked with the most.
</p>

<p>
	Based on our records, we've selected the following faculty as top
	candidates to provide evaluations for {{ $timePeriodDisplay }}.
</p>

<ol>
@foreach ($pairings as $pairing)
	<li>
		<b>{{ $pairing['faculty']->full_name }}</b>
		- {{ $pairing['numCases'] }} totalling
		{{ $pairing['totalTime']->format('%h hours, %i minutes') }}
	</li>
@endforeach
</ol>

<p>
	As always, if you have any questions or comments about the site
	please let me know at {{ config('app.admin_email') }} and I'll
	get back to you as soon as possible!
</p>

<p>
	Thank you!
</p>
