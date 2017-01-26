<div v-if="flaggedEvaluations" v-cloak class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-flag"></span>
		Flagged Evaluations
	</h2>
	<div class="table-responsive">
		<data-table :thead="flaggedEvalsThead" :data="flaggedEvalsData" />
	</div>
</div>

<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list"></span>
		Trainee Evaluations
	</h2>
	<div class="table-responsive">
		<data-table :thead="traineeEvalsThead" :config="traineeEvalsConfig" />
	</div>
</div>

<div v-if="watchedForms && watchedForms.length > 0" class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list-alt"></span>
		Watched forms
	</h2>
	<div v-for="(config, index) of watchedFormConfigs" class="watched-form-container">
		<h3>{{ watchedForms[index].form.title }}</h3>
		<data-table :thead="watchedFormThead" :config="config" />
	</div>
</div>


<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list"></span>
		Self Evaluations
	</h2>
	<div class="table-responsive">
		<data-table :thead="selfEvalThead" :config="selfEvalConfig" />
	</div>
</div>

<div class="container body-block">
	<h2 class="sub-header">
		<span class="glyphicon glyphicon-list"></span>
		Staff Evaluations
	</h2>
	<div class="table-responsive">
		<data-table :thead="staffEvalThead" :config="staffEvalConfig" />
	</div>


@push('scripts')
	<script>
		createAdminDashboard('main');
	</script>
@endpush
