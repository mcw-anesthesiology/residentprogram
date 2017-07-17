<template>
	<div class="user-with-report-list-item">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-2">
						<h3>{{ full_name }}</h3>
					</div>
					<div class="col-sm-10">
						<component-list :fields="meritReportFields" :items="merit_reports"
								:field-accessors="meritReportFieldAccessors"
								:paginate="false"
								default-sort-order="desc">
							<template scope="item">
								<merit-report-list-item v-bind="item"
									:user="user"
									@click="handleReportClick"
									@summary="handleViewSummary"
									@change="$emit('change')" />
							</template>
						</component-list>
					</div>
				</div>
				<div v-if="viewedReport" class="row">
					<merit-report v-bind="viewedReport"
						:title="viewedReport.form.name"
						:user="user"
						:saving="saving"
						:saving-successful="savingSuccessful"
						@close="handleReportClose"
						@save="handleReportSave"
						@submit="handleReportSubmit" />
				</div>
				<div v-if="viewedReportSummary" class="row">
					<merit-report-summary v-bind="viewedReportSummary"
						:title="viewedReportSummary.form.name"
						:subject-name="full_name"
						@close="handleCloseSummary" />
				</div>

				<alert-list v-model="alerts" />
			</div>
		</div>
	</div>
</template>

<script>
import HasAlerts from 'vue-mixins/HasAlerts.js';

import ComponentList from 'vue-components/ComponentList.vue';
import MeritReportListItem from './ReportListItem.vue';
import MeritReport from './Report.vue';
import MeritReportSummary from './Summary.vue';

import { getFetchHeaders, okOrThrow } from 'modules/utils.js';

export default {
	mixins: [
		HasAlerts
	],
	props: {
		full_name: {
			type: String,
			required: true
		},
		merit_reports: {
			type: Array,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},
	data() {
		return {
			viewedReport: null,
			viewedReportSummary: null,
			saving: false,
			savingSuccessful: false
		};
	},

	computed: {
		meritReportFields() {
			return [
				'id',
				'form_name'
			];
		},
		meritReportFieldAccessors() {
			return {
				'form_name': meritReport => meritReport.form.name
			};
		}
	},

	watch: {
		merit_reports(meritReports) {
			if (this.viewedReport)
				this.viewedReport = meritReports.find(meritReport =>
					meritReport.id === this.viewedReport.id);

			if (this.viewedReportSummary)
				this.viewedReportSummary = meritReports.find(meritReport =>
					meritReport.id === this.viewedReportSummary.id
				);
		}
	},

	methods: {
		handleReportClick(reportId) {
			this.viewedReport = this.merit_reports.find(meritReport =>
				meritReport.id === reportId);
		},
		handleReportClose() {
			this.viewedReport = null;
		},
		handleViewSummary(reportId) {
			this.viewedReportSummary = this.merit_reports.find(meritReport =>
				meritReport.id === reportId
			);
		},
		handleCloseSummary() {
			this.viewedReportSummary = null;
		},
		handleReportSave(changes, closeAfterward = true) {
			this.updateReport(changes).then(() => {
				if (closeAfterward)
					this.viewedReport = null;
			});
		},
		handleReportSubmit(changes, closeAfterward = true) {
			this.updateReport(Object.assign(changes, {
				status: 'complete'
			})).then(() => {
				if (closeAfterward)
					this.viewedReport = null;
			});
		},
		updateReport(changes) {
			this.saving = true;
			return fetch(`/merits/${changes.id}`, {
				method: 'POST', // PATCH
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign(changes, {
					_method: 'PATCH'
				}))
			}).then(okOrThrow).then(() => {
				this.savingSuccessful = true;
				this.saving = false;
				this.$emit('change');
			}).catch(err => {
				this.savingSuccessful = false;
				this.saving = false;
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem updating the merit report'
				});
			});
		}
	},

	components: {
		ComponentList,
		MeritReportListItem,
		MeritReport,
		MeritReportSummary
	}
};
</script>
