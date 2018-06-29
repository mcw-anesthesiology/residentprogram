import Vue from '@/vue-constructors/index.js';

import AlertList from '@/vue-components/AlertList.vue';
import EvaluationDataTable from '@/vue-components/EvaluationDataTable.vue';

import {
	renderEvaluatorEvalUrl,
	renderDateTimeCell,
	createDateTimeCell,
	renderDateRangeCell,
	createDateRangeCell,
	renderEvaluationStatus,
	renderSubjectCell
} from '@/modules/datatable-utils.js';
import { getUserSetting } from '@/modules/user-utils.js';

export default function createFacultyDashboard(el, propsData){

	return new Vue({
		el,
		props: {
			user: {
				type: Object,
				required: true
			},
			mentees: {
				type: Array,
				required: false
			},
			watchedForms: {
				type: Array,
				required: false
			}
		},
		propsData,

		data(){
			return {
				alerts: []
			};
		},

		computed: {
			defaultUserEvaluationRange() {
				return getUserSetting(this.user, 'defaultEvaluationRange');
			},
			pendingThead(){
				return [[
					'#',
					'Resident/Fellow',
					'Evaluation Form',
					'Evaluation Date',
					'Requested',
					''
				]];
			},
			pendingConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: [
									'full_name'
								],
								form: [
									'title'
								]
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
						{data: null, orderable: false, searchable: false, render: evaluation => {
							if(evaluation.requested_by_id === this.user.id)
								return `<button class='btn btn-danger btn-xs cancel-eval-button'
										data-id='${evaluation.id}'>
									<span class='glyphicon glyphicon-remove'></span>
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
					'Resident/Fellow',
					'Evaluation Form',
					'Evaluation Date',
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
								subject: ['full_name'],
								form: ['title'],
							},
							evaluator_id: this.user.id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
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
			},
			menteeThead(){
				return [[
					'#',
					'Evaluation Form',
					'Evaluation Date',
					'Requested',
					'Completed'
				]];
			},
			menteeConfigs(){
				return this.mentees.map(mentee => ({
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: [
									'title'
								]
							},
							subject_id: mentee.id,
							status: 'complete'
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
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell}
					],
					order: [[0, 'desc']],
					createdRow(row){
						$(row).addClass('view-evaluation');
					}
				}));
			},
			watchedFormThead(){
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
			watchedFormConfigs(){
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
						{data: null, orderable: false, searchable: false, render(){
							return '';
						}}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				}));
			},
			allThead(){
				return [[
					'#',
					'Resident',
					'Evaluation Form',
					'Evaluation Date',
					'Requested',
					'Completed'
				]];
			},
			allConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title'],
							},
							whereHas: {
								form: {
									type: 'resident',
									evaluator_type: 'faculty'
								}
							},
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name', render: renderSubjectCell},
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
			},
		},
		components: {
			AlertList,
			EvaluationDataTable
		}
	});
}
