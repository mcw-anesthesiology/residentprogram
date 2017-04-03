<div v-if="flaggedEvals && flaggedEvals.length > 0" v-cloak class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-flag"></span>
		Flagged Evaluations
	</h2>
	<data-table :thead="flaggedEvalsThead" :config="flaggedEvalsConfig"
		:data="flaggedEvals" />
</div>

<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list"></span>
		Trainee Evaluations
	</h2>
	<evaluation-data-table id="admin-trainee-evaluations-table"
		:thead="traineeEvalsThead" :config="traineeEvalsConfig" />
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
			<evaluation-data-table :id="`admin-watched-form-${watchedForms[index].form.id}-table`"
				:thead="watchedFormThead" :config="config" />
		</div>
	</div>
</div>


<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list"></span>
		Self Evaluations
	</h2>
	<evaluation-data-table id="admin-self-evals-table"
		:thead="selfEvalThead" :config="selfEvalConfig" />
</div>

<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list"></span>
		Staff Evaluations
	</h2>
	<evaluation-data-table id="admin-staff-evals-table"
		:thead="staffEvalThead" :config="staffEvalConfig" />
</div>


@push('scripts')
	<script>
		var propsData = {
			watchedForms: {!! $user->watchedForms()->with('form')->get()->toJson() !!},
			flaggedActions: {!! json_encode($flaggedActions) !!}
		};
		
		createAdminDashboard('main', propsData);
	</script>
@endpush
