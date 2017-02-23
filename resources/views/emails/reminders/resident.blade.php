<p>Hello Dr {{ $resident->last_name }}!</p>

<p>
	This is your monthly reminder from Resident Program.
</p>

<p>
	You are required to <b>request {{ $requirements['evaluationRequests'] }}
	evaluations</b> and <b>complete {{ $requirements['facultyEvaluations'] }}
	faculty evaluations</b> each month.

	So far this month, you have requested {{ $monthRequests }}
	{{ $monthRequests > 1 ? 'evaluations' : 'evaluation' }}
	and completed {{ $monthFacultyEvals }} faculty
	{{ $monthFacultyEvals > 1 ? 'evaluations' : 'evaluation' }}.
</p>

<p>
	<b>You must
	
@if($monthRequests < $requirements['evaluationRequests'])
	request {{ $requestsNeeded }}
	more {{ $requestsNeeded > 1 ? 'evaluations' : 'evaluation' }}
@endif

@if($monthRequests < $requirements['evaluationRequests']
		&& $monthFacultyEvals < $requirements['facultyEvaluations'])
	and
@endif

@if($monthFacultyEvals < $requirements['facultyEvaluations'])
	complete {{ $facultyEvalsNeeded }}
	more faculty {{ $facultyEvalsNeeded > 1 ? 'evaluations' : 'evaluation' }}
@endif
	
	before the end of the month.</b>
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
