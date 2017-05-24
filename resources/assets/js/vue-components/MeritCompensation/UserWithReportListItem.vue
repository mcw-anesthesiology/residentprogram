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
									@change="$emit('change')" />
							</template>
						</component-list>
					</div>
				</div>
				<div v-if="viewedReport" class="row">
					<merit-report v-bind="viewedReport"
						:title="viewedReport.form.name"
						:user="user"
						@close="handleReportClose"
						@save="handleReportSave"
						@submit="handleReportSubmit" />
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
			viewedReport: null
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

	methods: {
		handleReportClick(reportId) {
			this.viewedReport = this.merit_reports.find(meritReport =>
				meritReport.id === reportId);
		},
		handleReportClose() {
			this.viewedReport = null;
		},
		handleReportSave(changes) {
			this.updateReport(changes).then(() => {
				this.viewedReport = null;
			});
		},
		handleReportSubmit(changes) {
			this.updateReport(Object.assign(changes, {
				status: 'complete'
			})).then(() => {
				this.viewedReport = null;
			});
		},
		updateReport(changes) {
			return fetch(`/merits/${changes.id}`, {
				method: 'POST', // PATCH
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign(changes, {
					_method: 'PATCH'
				}))
			}).then(okOrThrow).then(() => {
				this.$emit('change');
			}).catch(err => {
				console.error(err);
				this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem updating the merit report'
				});
			});
		}
	},

	components: {
		ComponentList,
		MeritReportListItem,
		MeritReport
	}
};
</script>
