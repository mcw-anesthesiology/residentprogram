import Vue from 'vue';

import AlertList from '@/vue-components/AlertList.vue';
import EvaluationDataTable from '@/vue-components/EvaluationDataTable.vue';

import {
	renderEvaluatorEvalUrl,
	renderDateTimeCell,
	createDateTimeCell,
	renderDateRangeCell,
	createDateRangeCell,
	renderEvaluationStatus
} from '@/modules/datatable-utils.js';

export default function createStaffDashboard(el, propsData){
	
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
			pendingThead(){
				return [[
					'#',
					'Resident',
					'Form',
					'Evaluation Date',
					'Created'
				]];
			},
			pendingConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title'],
								subject: ['full_name']
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
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell}
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
					'Evaluator',
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
								evaluator: [
									'full_name'
								],
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
			completeThead(){
				return [[
					'#',
					'Resident',
					'Form',
					'Evaluation Date',
					'Created',
					'Completed'
				]];
			},
			completeConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title'],
								subject: ['full_name']
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
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell}
					],
					order: [[0, 'desc']],
					createdRow(row){
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		
		components: {
			AlertList,
			EvaluationDataTable
		}
	});
}
