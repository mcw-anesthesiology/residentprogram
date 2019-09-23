@extends("app")

@section('blockless-body')
	<div class="container body-block">
		<h1>Beyond milestones</h1>

		<h2 class="sub-heading">Improving feedback</h2>

		<p class="lead">
			In addition to your ACGME-mandated milestone assessments, over the
			past 6 months, we have been exploring the value of a more intuitive
			scenario-based feedback process.
			This research augments trainee evaluations with a few additional
			questions as described below.  It requires faculty to make a
			holistic judgment (gut sense) of how you might handle an
			anesthetic/patient care scenario based upon faculty experiences
			with you in the clinical setting.
		</p>

		<p>
			Each subspecialty's evaluation form has had two hypothetical
			<b>scenarios</b> appended to it, one of a standard estimated difficulty
			and one of a more advanced difficulty. When evaluating you,
			faculty rated their confidence in you handling such a scenario
			on a 5-point scale ranging from (level 1) their sense for a need
			to discuss the case with you, develop the plan, and stay in the OR with you
			one-to-one, to (level 5) full confidence in you handling
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

		<p>
			At this point in time, the additional questions are not being used
			to determine your progress in training by the Clinical Competency Committee.
			This is education research only.
			In a few months, we will be requesting your satisfaction rating on milestone
			evaluations and case-based evaluations.
		</p>
	</div>

	<beyond-milestones></beyond-milestones>
@endsection

@push('scripts')
	<script>
		createBeyondMilestonesReport('main');
	</script>
@endpush
