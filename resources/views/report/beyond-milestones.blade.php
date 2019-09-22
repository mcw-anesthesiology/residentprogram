@extends("app")

@section('blockless-body')
	<div class="container body-block">
		<h1>Beyond milestones</h1>

		<p class="lead">
			In an effort to compare the efficacy of ACGME's competency-based
			evaluation scheme to a more intuitive scenario-based scheme, we
			have been augmenting trainee evaluations with a few additional
			questions.
		</p>

		<p>
			Each subspecialty's evaluation form has had two hypothetical
			<b>scenarios</b> appended to it, one of a standard estimated difficulty
			and one of a more advanced difficulty. When evaluating you,
			faculty rated their confidence in you handling such a scenario
			on a 5-point scale ranging from an unwillingness to leave
			the room at any point, to full confidence in you handling
			the case on your own. Press on a scenario title or select
			one in the dropdown below to view it in detail.
		</p>

		<p>
			Additionally, each evaluation also included two true/false
			<b>professionalism questions</b> randomly selected from a
			small bank.
		</p>

		<p>
			Below you can view a summary of the responses that you
			have received, organized by scenario and question.
			You can compare these results to your existing
			milestone results using the
			<span class="label label-info">Show milestone evaluation report</span>
			button at the bottom of the page.
			You can view a list of evaluations containing each
			scenario or question using the
			<span class="label label-info">Show individual evaluations</span>
			button; each link will open the evaluation in a new window.
		</p>
	</div>

	<beyond-milestones></beyond-milestones>
@endsection

@push('scripts')
	<script>
		createBeyondMilestonesReport('main');
	</script>
@endpush
