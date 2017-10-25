import Vue from 'vue';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import EvaluationDataTable from '@/vue-components/EvaluationDataTable.vue';

import {
	renderEvaluatorEvalUrl,
	renderSubjectEvalUrl,
	renderDateTimeCell,
	createDateTimeCell,
	renderDateRangeCell,
	createDateRangeCell
} from '@/modules/datatable-utils.js';

export default function createResidentDashboard(el, propsData){

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
			pendingSubjectThead(){
				return [[
					'#',
					'Faculty',
					'Form',
					'Requested',
					''
				]];
			},
			pendingSubjectConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title']
							},
							subject_id: this.user.id,
							status: 'pending',
							visibility: 'visible'
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
			pendingEvaluatorThead(){
				return [[
					'#',
					'Subject',
					'Form',
					'Evaluation date',
					'Requested',
					''
				]];
			},
			pendingEvaluatorConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							evaluator_id: this.user.id,
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url', render: renderEvaluatorEvalUrl},
						{data: 'subject.full_name'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
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
			completeThead(){
				return [[
					'#',
					'Faculty',
					'Form',
					'Evaluation date',
					'Requested',
					'Completed'
				]];
			},
			completeConfig(){
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
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeStaffThead(){
				return [[
					'#',
					'Staff',
					'Form',
					'Evaluation Date',
					'Created',
					'Completed'
				]];
			},
			completeStaffConfig(){
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
									evaluator_type: 'staff'
								}
							},
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url', render: renderSubjectEvalUrl},
						{data: 'evaluator.full_name', render: function(name){
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
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeSelfThead(){
				return [[
					'#',
					'Form',
					'Evaluation Date',
					'Completed'
				]];
			},
			completeSelfConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title', 'evaluator_type']
							},
							whereHas: {
								form: {
									evaluator_type: 'self'
								}
							},
							evaluator_id: this.user.id,
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
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
