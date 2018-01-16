import Vue from 'vue';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import DataTable from '@/vue-components/DataTable.vue';
import EvaluationDataTable from '@/vue-components/EvaluationDataTable.vue';
import FlaggedEvaluationControls from '@/vue-components/Dashboard/FlaggedEvaluationControls.vue';

import { handleError } from '@/modules/errors.js';
import {
	renderDateRangeCell,
	createDateRangeCell,
	renderDateTimeCell,
	renderEvaluationStatus,
	createDateTimeCell
} from '@/modules/datatable-utils.js';
import { getUserSetting } from '@/modules/user-utils.js';
import { getFetchHeaders } from '@/modules/utils.js';

export default function createAdminDashboard(el, propsData){

	return new Vue({
		mixins: [HasAlerts],
		el,
		props: {
			user: {
				type: Object,
				required: true
			},
			flaggedActions: {
				type: Object,
				required: true
			},
			watchedForms: {
				type: Array,
				required: false
			},
		},
		propsData,

		data() {
			return {
				flaggedEvals: null
			};
		},

		mounted() {
			const flaggedEvalsBody = {
				with: {
					evaluation: true,
					'evaluation.evaluator': true,
					'evaluation.subject': true
				}
			};

			fetch(`/flagged_evaluations?${$.param(flaggedEvalsBody)}`, {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error(response.type);
			}).then(flaggedEvals => {
				this.flaggedEvals = flaggedEvals;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching flagged evaluations');
			});
		},

		computed: {
			defaultUserEvaluationRange() {
				return getUserSetting(this.user, 'defaultEvaluationRange');
			},
			flaggedEvalsThead() {
				return [[
					'#',
					'Evaluator',
					'Subject',
					'Requested Action',
					'Reason',
					''
				]];
			},
			flaggedEvalsConfig() {
				return {
					columns: [
						{data: 'evaluation.url'},
						{data: 'evaluation.evaluator.full_name'},
						{data: 'evaluation.subject.full_name'},
						{data: 'requested_action', render: action => {
							return this.flaggedActions[action];
						}},
						{data: 'reason'},
						{data: null, orderable: false, searchable: false,
							createdCell: (el, flaggedEval) => {
								const adminComponent = this;
								new Vue({
									el,
									render(h) {
										return h(FlaggedEvaluationControls, {
											props: {
												flaggedEval
											},
											on: {
												alert(alert) {
													adminComponent.alerts.push(alert);
												},
												remove() {
													adminComponent.flaggedEvals = adminComponent.flaggedEvals
														.filter(fe =>
															Number(fe.id) !== Number(flaggedEval.id));
												}
											}
										});
									}
								});
							}
						}
					],
					order: [[0, 'desc']]
				};
			},
			traineeEvalsThead() {
				return [[
					'#',
					'Trainee',
					'Faculty',
					'Form',
					'Evaluation date',
					'Requested',
					'Completed',
					'Status'
				]];
			},
			traineeEvalsConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: [
									'full_name'
								],
								evaluator: [
									'full_name'
								],
								form: [
									'title'
								],
							},
							whereHas: {
								form: {
									type: ['resident', 'fellow'],
									evaluator_type: 'faculty'
								}
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
						{data: 'evaluator.full_name'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'status', render: renderEvaluationStatus}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					},
					deferRender: true
				};
			},
			watchedFormThead() {
				return [[
					'#',
					'Subject',
					'Evaluator',
					'Evaluation date',
					'Completed',
					'Status',
					''
				]];
			},
			watchedFormConfigs() {
				return this.watchedForms.map(watchedForm => ({
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: true,
								evaluator: true
							},
							form_id: watchedForm.form_id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
						{data: 'evaluator.full_name'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'status', render: renderEvaluationStatus},
						{data: null, orderable: false, searchable: false, render() {
							return '';
						}}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				}));
			},
			intern360Thead() {
				return [[
					'#',
					'Intern',
					'Resident',
					'Form',
					'Evaluation date',
					'Completed',
					'Status',
					''
				]];
			},
			intern360Config() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: [
									'full_name'
								],
								evaluator: [
									'full_name'
								],
								form: [
									'title'
								]
							},
							whereHas: {
								form: {
									type: 'intern',
									evaluator_type: 'ca-1'
								}
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
						{data: 'evaluator.full_name'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'status', render: renderEvaluationStatus},
						{data: null, orderable: false, searchable: false, render() {
							return ''; // FIXME
						}}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			selfEvalThead() {
				return [[
					'#',
					'Evaluator',
					'Form',
					'Evaluation date',
					'Completed',
					'Status',
					''
				]];
			},
			selfEvalConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: [
									'full_name'
								],
								form: [
									'title'
								]
							},
							whereHas: {
								form: {
									evaluator_type: 'self'
								}
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'evaluator.full_name'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'status', render: renderEvaluationStatus},
						{data: null, orderable: false, searchable: false, render() {
							return ''; // FIXME
						}}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			staffEvalThead() {
				return [[
					'#',
					'Resident/Fellow',
					'Staff',
					'Form',
					'Evaluation Date',
					'Created',
					'Completed',
					'Status'
				]];
			},
			staffEvalConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: [
									'full_name'
								],
								subject: [
									'full_name'
								],
								form: [
									'title'
								]
							},
							whereHas: {
								form: {
									evaluator_type: 'staff'
								}
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
						{data: 'evaluator.full_name'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'status', render: renderEvaluationStatus}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			appEvalThead() {
				return [[
					'#',
					'APP',
					'Evaluator',
					'Form',
					'Evaluation date',
					'Created',
					'Completed',
					'Status'
				]];
			},
			appEvalConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: [
									'full_name'
								],
								subject: [
									'full_name'
								],
								form: [
									'title'
								]
							},
							whereHas: {
								form: {
									type: 'app'
								}
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
						{data: 'evaluator.full_name'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'status', render: renderEvaluationStatus}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			DataTable,
			EvaluationDataTable
		}
	});
}
