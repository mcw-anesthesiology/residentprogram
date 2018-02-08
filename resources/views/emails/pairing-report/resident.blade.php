<style>
	table {
		margin: 2em 2em 4em;
		table-layout: fixed;
		border-collapse: collapse;
	}

	th {
		text-align: left;
	}

	th, td {
		padding: 1em;
	}

	tr {
		border-bottom: 1px solid #333333;
	}
</style>

<p>Hello Dr {{ $user['last_name'] }}!</p>

@if (!empty($intro))
<div>
	{!! $intro !!}
</div>
@else
<p>
	In an attempt to provide you more feedback and make it simpler
	for evaluators to complete evaluations, we will be providing a periodic
	report of the faculty we believe you worked with the most.
</p>
@endif

@if (!empty($pairings))
	@if (!empty($successLead))
<div>
	{!! $successLead !!}
</div>
	@else
<p>
	Based on our records, we've selected the following faculty as top
	candidates to provide evaluations for {{ $periodDisplay }}. Please use this
	as a reference to request evaluations and to complete evaluations of faculty.
</p>
	@endif

<table>
	<thead>
		<tr>
			<th>Faculty</th>
			<th>Cases together</th>
			<th>Time together</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
	@foreach ($pairings as $pairing)
		<tr>
			<td>{{ $pairing['faculty']['full_name'] }}</td>
			<td>
				{{ $pairing['numCases'] }}
				case{{ $pairing['numCases'] == 1 ? '' : 's' }}
			</td>
			<td>
				{{
					preg_replace(
						'/^1 days/',
						'1 day',
						preg_replace(
							'/^0 days, /',
							'',
							str_replace(
								' 1 hours',
								' 1 hour',
								str_replace(
									' 1 minutes',
									' 1 minute',
									$pairing['totalTime']
										->format('%a days, %h hours, %i minutes')
								)
							)
						)
					)
				}}
			</td>
			<td>
				<a href="{{ url("/request?evaluator={$pairing['faculty']['id']}{$evaluationDateParams}") }}">
					Request evaluation
				</a>
			</td>
		</tr>
	@endforeach
	</tbody>
</table>

@else
	@if (!empty($emptyMessage))
<div>
	{!! $emptyMessage !!}
</div>
	@else
<p>
	Unfortunately, we weren't able to come up with a list of faculty
	for you this time. We're sorry about that!

	Please request evaluations from faculty members who you've worked with.
</p>
	@endif
@endif

@if (!empty($closing))
<div>
	{!! $closing !!}
</div>
@endif

<p>
	Please visit the
	<a href="{{ $requestUrl }}">request trainee evaluation</a>
	page to request a new evaluation, or view your
	<a href="{{ url("/dashboard") }}">dashboard</a>
	to review any pending requests.

	Please visit the
	<a href="{{ url('/request/faculty') }}">faculty evaluation creation</a>
	page to evaluate faculty members who you've worked with.
</p>

<p>
	If you are unable to login, please try
	<a href="{{ url("/password/reset") }}">resetting your password</a>
	using your email address, or please
	<a href="mailto:{{ config('app.admin_email') }}">send me an email</a>
	and I'll be happy to reset it for you.
</p>

<p>
	As always, if you have any questions or comments about the site
	please let me know at
	<a href="mailto:{{ config('app.admin_email') }}">{{ config('app.admin_email') }}</a>
	and I'll get back to you as soon as possible!
</p>

<p>
	Thank you!
</p>
