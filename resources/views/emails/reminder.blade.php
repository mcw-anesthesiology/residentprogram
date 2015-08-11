<h3>Hello!</h3>
<p>
	This is your {{ $frequency }} reminder from ResidentProgram.com.
</p>

<p>
	You currently have <b>{{ $numPending }}</b> pending evaluations.
	@if($numPending)
		Please complete them at your earliest convenience, as well as additional evaluations for others you may have worked with.
	@else
		Great job! Please do not forget to complete evaluations for residents or fellows you may have worked with.
	@endif
	A list of people you may have worked with should be available upon selection of a block when <a href="{{ url("/request") }}">creating an evaluation</a>, or you can still select from the entire list if you wish.
</p>

<p>
	If you would like to change the frequency of these reminders, you can do so via the <a href="{{ url("/user") }}">account management page</a>.
</p>

<p>
	As always, if you have any questions or comments about the system, you can contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at <a href="mailto:{{ env('ADMIN_EMAIL') }}">{{ env('ADMIN_EMAIL') }}</a>.
</p>
