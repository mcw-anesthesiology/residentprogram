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

	.cases-cell {
		text-align: right;
	}
</style>

<p>Hello Dr {{ $user['last_name'] }}!</p>

{!! $intro !!}
@if (!empty($intro))
<div>
</div>
@else
<p>
	In an attempt to provide more feedback to our trainees and make it simpler
	for you to complete evaluations, we will be providing a periodic report of
	the trainees we believe you worked with the most.
</p>
@endif

@if (!empty($pairings))
	@if (!empty($successLead))
<div>
	{!! $successLead !!}
</div>
	@endif

<table>
	<thead>
		<tr>
			<th>{{ ucfirst($subjectType) }}</th>
			<th></th>
			<th>Cases together</th>
			<th>Time together</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
	@foreach ($pairings as $pairing)
		<tr>
			<td>{{ $pairing[$subjectType]['full_name'] }}</td>
			<td>{{ ucfirst($pairing[$subjectType]['specific_type']) }}</td>
			<td class="cases-cell">
				{{ $pairing['numCases'] }}
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
				<a href="{{ url("/request?subject={$pairing[$subjectType]['id']}{$evaluationDateParams}") }}">
					Evaluate
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
	@endif
@endif

@if (!empty($closing))
<div>
	{!! $closing !!}
</div>
@endif

<p>
	Please visit the
	<a href="{{ $requestUrl }}">{{ $subjectType }} evaluation creation</a>
	page to begin a new evaluation, or view your
	<a href="{{ url("/dashboard") }}">dashboard</a>
	to complete any pending requests.
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
