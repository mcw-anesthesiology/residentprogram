<template>
	<div>
		<div v-if="show.summary" class="summary-container">
			<case-log-summary v-if="v2CaseLogs && v2CaseLogs.length > 0"
					:case-logs="v2CaseLogs">
			</case-log-summary>

			<case-log-summary-v1 v-if="v1CaseLogs && v1CaseLogs.length > 0"
					:case-logs="v1CaseLogs">
			</case-log-summary-v1>
		</div>

		<div class="text-center">
			<show-hide-button class="btn btn-info" v-model="show.summary">
				chart
				<template slot="glyph"></template>
			</show-hide-button>
		</div>

		<data-table
			:thead="thead"
			:config="tconfig"
			:data="caseLogs">
		</data-table>

		<component :is="detailsComponent"
			v-if="detailsCaseLog"
			:case-log="detailsCaseLog"
			:locations="locations"
			@close="closeCaseLog">
		</component>
	</div>
</template>

<script>
import Vue from 'vue';

import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import DataTable from '@/vue-components/DataTable.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import CaseLogViewer from './Viewer.vue';
import CaseLogSummary from './Summary.vue';

import CaseLogDetailsV1 from './V1/Details.vue';
import CaseLogSummaryV1 from './V1/DetailsReport.vue';

import { renderDateCell, createDateCell } from '@/modules/datatable-utils.js';
import { getFetchHeaders, okOrThrow } from '@/modules/utils.js';

export default {
	props: {
		caseLogs: {
			type: Array,
			required: true
		},
		locations: {
			type: Array,
			required: true
		},
		removable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			detailsCaseLog: null,

			show: {
				summary: false
			}
		};
	},

	computed: {
		caseLogVersion() {
			try {
				return this.detailsCaseLog.details_schema.case_log_version;
			} catch (e) {
				console.error(e);
			}

			return 1;
		},
		detailsComponent() {
			return this.caseLogVersion === 2
				? 'CaseLogViewer'
				: 'CaseLogDetailsV1';
		},
		v1CaseLogs() {
			return this.caseLogs
				.filter(caseLog => caseLog.details_schema.case_log_version !== 2);
		},
		v2CaseLogs() {
			return this.caseLogs
				.filter(caseLog => caseLog.details_schema.case_log_version === 2);
		},
		thead() {
			return [[
				'#',
				'Location',
				'Date',
				'Type',
				''
			]];
		},
		tconfig() {
			let removeCaseLog = this.removeCaseLog;
			let renderCaseLog = this.renderCaseLog;
			let alerts = this.alerts;
			let removable = this.removable;

			let columns = [
				{data: 'id'},
				{data: 'location.name'},
				{data: 'case_date', render: renderDateCell, createdCell: createDateCell},
				{data: 'details_schema.details_type', render(detailsType) {
					if (detailsType)
						return detailsType.toUpperCase();

					return '';
				}},
				{
					data: null,
					orderable: false,
					searchable: false,
					render(){
						let parts = [];
						parts.push('<span>');
						parts.push(
							`<button class="btn btn-sm btn-info"
									@click="viewCaseLog">
								<span class="glyphicon glyphicon-list-alt"></span>
								View
							</button>`
						);

						if (removable)
							parts.push(
								`<confirmation-button class="btn btn-sm"
										unpressed-class="btn-danger"
										pressed-class="btn-warning"
										@click="deleteCaseLog">
									<span class="glyphicon glyphicon-remove"></span>
									Delete
								</confirmation-button>`
							);

						parts.push('</span>');
						return parts.join(' ');
					},
					createdCell(el, caseLog){
						el.className = 'text-right';

						new Vue({
							el,
							methods: {
								deleteCaseLog() {
									fetch(`/case_logs/${caseLog.id}`, {
										method: 'POST', // DELETE
										headers: getFetchHeaders(),
										credentials: 'same-origin',
										body: JSON.stringify({
											_method: 'DELETE'
										})
									}).then(okOrThrow).then(() => {
										removeCaseLog(caseLog.id);
									}).catch(err => {
										console.error(err);
										alerts.push({
											type: 'error',
											html: `<strong>
												Error:
											</strong>
											There was a problem deleting the case log entry`
										});
									});
								},
								viewCaseLog() {
									renderCaseLog(caseLog);
								}
							},
							components: {
								ConfirmationButton
							}
						});
					}
				}
			];

			return {
				columns,
				order: [[0, 'desc']]
			};
		}
	},

	methods: {
		renderCaseLog(caseLog) {
			this.detailsCaseLog = caseLog;
		},
		removeCaseLog(caseLogId) {
			this.$emit('delete', caseLogId);
		},
		closeCaseLog() {
			this.detailsCaseLog = null;
		}
	},

	components: {
		DataTable,
		ShowHideButton,
		CaseLogViewer,
		CaseLogSummary,

		CaseLogDetailsV1,
		CaseLogSummaryV1,

	}
};
</script>
