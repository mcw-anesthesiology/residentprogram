import Vue from '@/vue-constructors/index.js';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import EvaluationDataTable from '@/vue-components/EvaluationDataTable.vue';

import {
	renderSubjectEvalUrl,
	renderDateTimeCell,
	createDateTimeCell,
	renderDateRangeCell,
	createDateRangeCell
} from '@/modules/datatable-utils.js';
import { getUserSetting } from '@/modules/user-utils.js';

export default function createAPPDashboard(el, propsData) {
	return new Vue({
		mixins: [
			HasAlerts
		],
		el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData,

		computed: {
			defaultUserEvaluationRange() {
				return getUserSetting(this.user, 'defaultEvaluationRange');
			},
			pendingSubjectThead() {
				return [[
					'#',
					'Evaluator',
					'Form',
					'Requested',
					''
				]];
			},
			pendingSubjectConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title']
							},
							subject_id: this.user.id,
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'evaluator.full_name', render(name){
							if(!name)
								return '<i>Anonymous</i>';

							return name;
						}},
						{data: 'form.title'},
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: null, render: evaluation => {
							if(evaluation.requested_by_id === this.user.id)
								return `<button class="btn btn-danger btn-xs cancel-eval-button"
										data-id="${evaluation.id}">
									<span class="glyphicon glyphicon-remove"></span>
									Cancel
								</button>`;

							return '';
						}}
					],
					order: [[0, 'desc']],
					createdRow(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeThead() {
				return [[
					'#',
					'Evaluator',
					'Form',
					'Evaluation date',
					'Requested',
					'Completed'
				]];
			},
			completeConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title', 'evaluator_type']
							},
							whereHas: {
								form: {
									evaluator_type: 'faculty'
								}
							},
							subject_id: this.user.id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url', render: renderSubjectEvalUrl},
						{data: 'evaluator.full_name', render(name){
							if(!name)
								return '<i>Anonymous</i>';

							return name;
						}},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
					],
					order: [[0, 'desc']],
					createdRow(row){
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			EvaluationDataTable
		}
	});
}
