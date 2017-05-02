<div class="container body-block">
	<merit-compensation-report v-if="meritCompensationReport"
		v-bind="meritCompensationReport"
		:title="yearlyFacultyMeritForm.name"
		@close="handleClose"
		@save="handleSubmit"
		@submit="handleSubmit">
	</merit-compensation-report>
	<template v-else>
		<template v-if="needsToStartReport">
			You haven't submitted a merit report yet for this year, please do that!
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
						@click="addMeritReport">
					Complete merit report
				</button>
			</div>
		</template>
		<template v-else-if="inProgressReport">
			<p>
				You have a merit report in progress:
				<span>@{{ inProgressReport.form.name }}</span>
				<span>
					@{{
						renderDateRange({
							startDate: inProgressReport.period_start,
							endDate: inProgressReport.period_end
						})
					}}
				</span>
			</p>
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
						@click="finishMeritReport">
					Finish merit report
				</button>
			</div>
		</template>
		<template v-else>
			<p>
				You've already completed your merit report for this year. Thanks!
			</p>
			<button type="button" class="btn btn-info center-block"
					@click="viewMostRecentSubmission">
				View your submission
			</button>
		</template>
	</template>

	<alert-list v-model="alerts"></alert-list>
</div>

<div class="container body-block">
	<component-list v-if="meritReports && meritReports.length > 0" :items="meritReports"
			:fields="meritReportFields"
			:field-accessors="meritReportFieldAccessors"
			default-sort-order="desc">
		<template scope="item">
			<merit-report-list-item v-bind="item" @click="handleViewReport">
			</merit-report-list-item>
		</template>
	</component-list>
	<div v-else>
		<p>
			You don't have any submitted merit reports yet. Please submit one!
		</p>
	</div>
</div>

@push('scripts')
	<script>
		createFacultyMeritReports('main', propsData);
	</script>
@endpush
