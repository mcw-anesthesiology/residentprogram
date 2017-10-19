<template>
	<div>
		<case-log-details-report v-if="show.charts"
				:case-logs="caseLogs">
		</case-log-details-report>

		<div class="text-center">
			<show-hide-button class="btn btn-info" v-model="show.charts">
				charts
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

import CaseLogDetailsV1 from './V1/Details.vue';
import CaseLogDetailsReportV1 from './V1/DetailsReport.vue';

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
				charts: false
			}
		};
	},

	computed: {
		detailsComponent() {
			try {
				if (this.detailsCaseLog.details_schema.case_log_version === 2)
					return 'CaseLogViewer';
			} catch (e) {
				console.error(e);
			}

			return 'CaseLogDetailsV1';
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

		CaseLogDetailsV1,
		CaseLogDetailsReportV1,

	}
};
</script>
