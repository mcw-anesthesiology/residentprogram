import Vue from 'vue';

import DataTable from '../../vue-components/DataTable.vue';

import { getFetchHeaders, toQueryString } from '../../modules/utils.js';
import {
	renderDateRangeCell,
	createDateRangeCell,
	renderDateTimeCell,
	renderEvaluationStatus,
	createDateTimeCell
} from '../../modules/datatable-utils.js';

export default function createAdminDashboard(el, propsData){
		
	return new Vue({
		el: el,
		
		props: {
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
		
		data(){
			return {
				flaggedEvals: null,
				
				alerts: null
			};
		},
		
		mounted(){
			const flaggedEvalsBody = {
				with: {
					evaluation: true,
					'evaluation.evaluator': true,
					'evaluation.subject': true
				}
			};
			
			fetch(`/flagged_evaluations?${toQueryString(flaggedEvalsBody)}`, {
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
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<b>Error</b>: Problem fetching flagged evaluations'
				});
			});
		},
		
		computed: {
			flaggedEvalsThead(){
				return [[
					'#',
					'Evaluator',
					'Subject',
					'Requested Action',
					'Reason',
					''
				]];
			},
			flaggedEvalsConfig(){
				// FIXME
				return {
					columns: [
						{data: "evaluation.url"},
						{data: "evaluation.evaluator.full_name"},
						{data: "evaluation.subject.full_name"},
						{data: "requested_action", render(action){
							return this.flaggedActions[action];
						}},
						{data: "reason"},
						{data: null, orderable: false, searchable: false, render(flaggedEval){
							return '<button type="button" class="remove-flag btn btn-primary btn-xs" '
								+ 'data-id="' + flaggedEval.id + '"><span class="glyphicon glyphicon-ok"></span> '
								+ 'Complete</button>';
						}}
					],
					order: [[0, "desc"]],
					createdRow: function(row){
						$(row).addClass("view-evaluation");
					}
				};
			},
			traineeEvalsThead(){
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
			traineeEvalsConfig(){
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
				// TODO
				return [];
			},
			selfEvalThead(){
				return [[
					'#',
					'Evaluator',
					'Form',
					'Evaluation date',
					'Completed',
					'Status',
					'',
				]];
			},
			selfEvalConfig(){
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
						{data: null, orderable: false, searchable: false, render(){
							return ''; // FIXME
						}}
					],
					order: [[0, 'desc']],
					createdRow: function(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			staffEvalThead(){
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
			staffEvalConfig(){
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
			}
		},
		
		components: {
			DataTable
		}
	});
}
