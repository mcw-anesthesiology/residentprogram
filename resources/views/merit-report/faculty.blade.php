@push('stylesheets')
	<style>
		.lead {
			font-size: 1.5em;
			margin: 1em 3em;
			text-align: center;
		}

		.progress-form {
			margin: 1em 0;
			display: block;
			font-size: 1.05em;
			font-weight: bold;
		}
	</style>
@endpush

<div id="faculty-merit-reports-container">
	<div class="container body-block">
		<merit-compensation-report v-if="meritCompensationReport"
			v-bind="meritCompensationReport"
			:title="yearlyFacultyMeritForm.name"
			:user="user"
			:saving="saving"
			:saving-successful="savingSuccessful"
			@close="handleClose"
			@save="handleSubmit"
			@submit="handleSubmit">
		</merit-compensation-report>
		<template v-else>
			<template v-if="inProgressReport">
				<p class="lead">
					You have a merit report in progress:
					<span class="progress-form">
						<span>
							@{{ inProgressReport.form.name }}
						</span>
						-
						<rich-date-range :dates="inProgressReport"
							start="period_start"
							end="period_end" />
					</span>
				</p>
				<div class="btn-lg-submit-container">
					<button type="button" class="btn btn-lg btn-primary"
							@click="finishMeritReport">
						Finish merit report
					</button>
				</div>
			</template>
			<template v-else-if="needsToStartReport">
				<p class="lead">
					You haven't submitted a merit report yet for this year, please do that!
				</p>
				<div class="btn-lg-submit-container">
					<button type="button" class="btn btn-lg btn-primary"
							@click="addMeritReport">
						Complete merit report
					</button>
				</div>
			</template>

			<template v-else>
				<p class="lead">
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
		<h2>Your merit reports</h2>
		<component-list v-if="meritReports && meritReports.length > 0" :items="meritReports"
				:fields="meritReportFields"
				:field-accessors="meritReportFieldAccessors"
				default-sort-order="desc">
			<template scope="item">
				<merit-report-list-item v-bind="item"
					@click="handleViewReport"
					@change="fetchPastMeritReports"
					@alert="alerts.push(arguments[0])">
				</merit-report-list-item>
			</template>
		</component-list>
		<div v-else>
			<p class="lead">
				You don't have any submitted merit reports yet.
				Please submit one!
			</p>
		</div>
	</div>
</div>

@push('scripts')
	<script>
		createFacultyMeritReports('#faculty-merit-reports-container', propsData);
	</script>
@endpush
