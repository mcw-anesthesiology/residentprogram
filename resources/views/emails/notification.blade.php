<h3>Hello!</h3>
<br />
<p>
	You have received a <a href="{{ url("/evaluation/".$evaluationId) }}">new evaluation request</a>! Please complete it at your earliest convenience.
</p>

<p>
	If you would like to disable these notifications, you can do so via the <a href="{{ url("/user") }}">account management page</a>.
</p>

<p>
	As always, if you have any questions or comments about the system, you can contact me from the <a href="{{ url("/contact") }}">contact page</a>
	or by emailing me directly at <a href="mailto:{{ env('ADMIN_EMAIL') }}">{{ env('ADMIN_EMAIL') }}</a>.
</p>
