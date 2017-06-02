<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Requests</h2>
@if($user->subjectEvaluations()->where("status", "pending")->count() > 0)
	<evaluation-data-table id="trainee-pending-evals-table"
		range="allTime" :thead="pendingSubjectThead" :config="pendingSubjectConfig"></evaluation-data-table>
@else
	<p class="lead">You have no pending evaluation requests, why not <a href="/request">request one?</a></p>
@endif
</div>

@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Evaluations To Complete</h2>
	<evaluation-data-table id="trainee-pending-evaluator-evals-table"
		range="allTime" :thead="pendingEvaluatorThead" :config="pendingEvaluatorConfig"></evaluation-data-table>
</div>
@endif

<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
@if($user->subjectEvaluations()->where("evaluator_id", "!=", $user->id)->where("status", "complete")->count() > 0)
	<evaluation-data-table id="trainee-completed-evals-table"
		:thead="completeThead" :config="completeConfig"></evaluation-data-table>
@else
	<p class="lead">You have no completed evaluations</p>
@endif
</div>

@if($numStaffEvals > 0)
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Staff Evaluations</h2>
	<evaluation-data-table id="trainee-staff-evals-table"
		:thead="completeStaffThead" :config="completeStaffConfig"></evaluation-data-table>
</div>
@endif

@if($numSelfEvals > 0)
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-user"></span> Self Evaluations</h2>
	<evaluation-data-table id="trainee-self-evals-table"
		:thead="completeSelfThead" :config="completeSelfConfig"></evaluation-data-table>
</div>
@endif

@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!}
		};

		createResidentDashboard('main', propsData);
	</script>
@endpush
