<template>
	<div>
		<case-log-details-report v-if="show.charts"
				:case-logs="caseLogs">
		</case-log-details-report>

		<data-table
			:thead="thead"
			:config="tconfig"
			:data="caseLogs">
		</data-table>

		<case-log-details v-if="detailsCaseLog"
			:case-log="detailsCaseLog"
			:locations="locations"
			@close="closeCaseLog">
		</case-log-details>

		<div class="text-center">
			<show-hide-button v-model="show.charts">
				charts
			</show-hide-button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

import ConfirmationButton from 'vue-components/ConfirmationButton.vue';
import DataTable from 'vue-components/DataTable.vue';
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import CaseLogDetails from 'vue-components/CaseLog/Details.vue';
import CaseLogDetailsReport from 'vue-components/CaseLog/DetailsReport.vue';
import CaseLogDetailsSchema from 'vue-components/CaseLog/DetailsSchema.vue';

import { renderDateCell, createDateCell } from 'modules/datatable-utils.js';
import { getFetchHeaders, okOrThrow } from 'modules/utils.js';

export default {
	props: {
		caseLogs: {
			type: Array,
			required: true
		},
		locations: {
			type: Array,
			required: true
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
						return `
						<span>
							<button class="btn btn-sm btn-info"
									@click="viewCaseLog">
								<span class="glyphicon glyphicon-list-alt"></span>
								View
							</button>
							<confirmation-button class="btn btn-sm"
									unpressed-class="btn-danger"
									pressed-class="btn-warning"
									@click="deleteCaseLog">
								<span class="glyphicon glyphicon-remove"></span>
								Delete
							</confirmation-button>
						</span>
						`;
					},
					createdCell(el, caseLog){
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

			let viewDetailsContainer = this.$refs.detailsContainer;
			console.log(viewDetailsContainer);

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
		closeCaseLog() {
			this.detailsCaseLog = null;
		}
	},

	components: {
		DataTable,
		ShowHideButton,
		CaseLogDetails,
		CaseLogDetailsReport,
		CaseLogDetailsSchema
	}
};
</script>
