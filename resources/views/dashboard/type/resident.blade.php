<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Requests</h2>
@if($user->subjectEvaluations()->where("status", "pending")->count() > 0)
	<div class="table-responsive">
		<evaluation-data-table :thead="pendingSubjectThead"
			:config="pendingSubjectConfig" />
	</div>
@else
	<p class="lead">You have no pending evaluation requests, why not <a href="/request">request one?</a></p>
@endif
</div>

@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Evaluations To Complete</h2>
	<div class="table-responsive">
		<evaluation-data-table :thead="pendingEvaluatorThead"
			:config="pendingEvaluatorConfig">
	</div>
</div>
@endif

<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
@if($user->subjectEvaluations()->where("evaluator_id", "!=", $user->id)->where("status", "complete")->count() > 0)
	<div class="table-responsive">
		<evaluation-data-table :thead="completeThead" :config="completeConfig" />
	</div>
@else
	<p class="lead">You have no completed evaluations</p>
@endif
</div>

@if($numStaffEvals > 0)
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Staff Evaluations</h2>
	<div class="table-responsive">
		<evaluation-data-table :thead="completeStaffThead"
			:config="completeStaffConfig" />
	</div>
</div>
@endif

@if($numSelfEvals > 0)
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-user"></span> Self Evaluations</h2>
	<div class="table-responsive">
		<evaluation-data-table :thead="completeSelfThead"
			:config="completeSelfConfig" />
	</div>
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
