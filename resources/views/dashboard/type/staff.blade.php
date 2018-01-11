<div class="container body-block">
@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Pending</h2>
	<evaluation-data-table id="staff-pending-evals-table"
		range="allTime"
		:thead="pendingThead"
		:config="pendingConfig">
	</evaluation-data-table>
@else
	<p class="lead">You have no pending evaluation requests, why not <a href="/request/staff">create one?</a></p>
@endif
</div>

<div v-if="mentees && mentees.length > 0" v-cloak
		class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-user"></span>
		Mentee evaluations
	</h2>
	<div v-for="(config, index) of menteeConfigs" class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">@{{ mentees[index].full_name }}</h3>
		</div>
		<div class="panel-body">
			<evaluation-data-table :id="`staff-mentee-${mentees[index].id}-evals-table`"
				:range="defaultUserEvaluationRange"
				:thead="menteeThead"
				:config="config">
			</evaluation-data-table>
		</div>
	</div>
</div>

<div v-if="watchedForms && watchedForms.length > 0" v-cloak
		class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list-alt"></span>
		Watched forms
	</h2>
	<div v-for="(config, index) of watchedFormConfigs" class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">@{{ watchedForms[index].form.title }}</h3>
		</div>
		<div class="panel-body">
			<evaluation-data-table :id="`staff-watched-form-${watchedForms[index].form.id}-table`"
				:range="defaultUserEvaluationRange"
				:thead="watchedFormThead"
				:config="config">
			</evaluation-data-table>
		</div>
	</div>
</div>

<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
	<evaluation-data-table id="staff-completed-evals-table"
		:range="defaultUserEvaluationRange"
		:thead="completeThead"
		:config="completeConfig">
	</evaluation-data-table>
</div>


@push('scripts')
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			watchedForms: {!! $user->watchedForms()->with('form')->get()->toJson() !!},
			mentees: {!! $user->mentees !!}
		};

		createStaffDashboard('main', propsData);
	</script>
@endpush
