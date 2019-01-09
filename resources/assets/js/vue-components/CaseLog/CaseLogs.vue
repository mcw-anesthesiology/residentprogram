<template>
	<div>
		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="text-right">
					<show-hide-button class="btn btn-info" v-model="show.summary">
						summary
						<template slot="glyph"></template>
					</show-hide-button>
				</div>
			</div>

			<div v-show="show.summary" class="panel-body">
				<case-log-summary v-if="v2CaseLogs && v2CaseLogs.length > 0"
						:case-logs="v2CaseLogs">
				</case-log-summary>

				<case-log-summary-v1 v-if="v1CaseLogs && v1CaseLogs.length > 0"
						:case-logs="v1CaseLogs">
				</case-log-summary-v1>
			</div>
		</div>

		<data-table
			:thead="thead"
			:config="tconfig"
			:data="caseLogs">
		</data-table>
	</div>
</template>

<script>
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import DataTable from '@/vue-components/DataTable.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import CaseLogSummary from './Summary.vue';

import CaseLogSummaryV1 from './V1/DetailsReport.vue';

import { renderDateCell, createDateCell } from '@/modules/datatable-utils.js';

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
		editable: {
			type: Boolean,
			default: false
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
		v1CaseLogs() {
			return this.caseLogs
				.filter(caseLog => Number(caseLog.details_schema.case_log_version) !== 2);
		},
		v2CaseLogs() {
			return this.caseLogs
				.filter(caseLog => Number(caseLog.details_schema.case_log_version) === 2);
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
			const deleteCaseLog = this.deleteCaseLog;
			const removable = this.removable;
			const editable = this.editable;
			const $router = this.$router;

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
							`<button type="button" class="btn btn-info btn-sm"
									@click="viewCaseLog">
								<span class="glyphicon glyphicon-list-alt"></span>
								View
							</button>`
						);

						if (editable) {
							parts.push(
								`<button type="button" class="btn btn-info btn-sm"
										@click="editCaseLog">
									<span class="glyphicon glyphicon-pencil"></span>
									Edit
								</button>`
							);
						}

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
								viewCaseLog() {
									$router.push(`/${caseLog.id}/view`);
								},
								editCaseLog() {
									$router.push(`/${caseLog.id}/edit`);
								},
								deleteCaseLog() {
									deleteCaseLog(caseLog.id);
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
		deleteCaseLog(caseLogId) {
			this.$emit('delete', caseLogId);
		}
	},

	components: {
		DataTable,
		ShowHideButton,
		CaseLogSummary,

		CaseLogSummaryV1
	}
};
</script>
