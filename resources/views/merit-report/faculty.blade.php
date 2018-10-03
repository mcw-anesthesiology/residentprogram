@push('stylesheets')
	<style>
		.lead {
			font-size: 1.5em;
			margin: 1em;
			text-align: center;
		}

		.progress-form {
			margin: 1em 0;
			display: block;
			font-size: 1.05em;
			font-weight: bold;
		}

		#faculty-merit-reports-container .alert {
			padding: 4em 2em;
		}

		#faculty-merit-reports-container .alert > .lead {
			margin: 1em;
		}
	</style>
@endpush

<div id="faculty-merit-reports-container" class="container">
	<bootstrap-alert v-if="inProgressReport" type="info">
		<p class="lead">
			You have a merit checklist in progress:
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
				Continue from where you left off
			</button>
		</div>
	</bootstrap-alert>
	<template v-else-if="needsToStartReport">
		<bootstrap-alert v-if="yearlyFacultyForm" type="info">
			<p class="lead">
				You haven't submitted a merit checklist yet for this year.
			</p>
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
					@click="addMeritReport">
						Start a new merit checklist
				</button>
			</div>
		</bootstrap-alert>
		<bootstrap-alert v-else type="warning">
			<p class="lead">
				You haven't submitted a checklist yet for this year, but there was
				a problem fetching the form. Sorry about that.
			</p>
			<p class="lead">
				Please
				<a href="/contact?subject=No+merit+form&body=It+says+there+was+a+problem+fetching+the+form+and+to+let+you+know.">
					let me know using the contact form
				</a>
				or by emailing me at
				<a href="mailto:{{ config('app.admin_email') }}">{{ config('app.admin_email') }}</a>.
			</p>
		</bootstrap-alert>
	</template>

	<bootstrap-alert v-else type="success">
		<p class="lead">
			You've already completed your merit checklist for this year. Thanks!
		</p>
		<button type="button" class="btn btn-info center-block"
				@click="viewMostRecentSubmission">
			View your submission
		</button>
	</bootstrap-alert>

</div>

	<alert-list v-model="alerts"></alert-list>

	<div class="container body-block">
		<h2>Your merit checklists</h2>
		<component-list v-if="userMeritReports && userMeritReports.length > 0"
				:items="userMeritReports"
				:fields="meritReportFields"
				:field-accessors="meritReportFieldAccessors"
				default-sort-order="desc"
				reloadable
				@reload="fetchAllMeritReports">
			<template slot-scope="item">
				<merit-report-list-item v-bind="item"
					@click="viewReport"
					@summary="viewReportSummary"
					@change="handleReload"
					@alert="alerts.push(arguments[0])">
				</merit-report-list-item>
			</template>
		</component-list>
		<div v-else>
			<p class="lead">
				You don't have any submitted merit checklists yet.
			</p>
		</div>
	</div>
</div>
