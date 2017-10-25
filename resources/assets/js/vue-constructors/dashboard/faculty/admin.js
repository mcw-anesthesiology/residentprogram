import Vue from 'vue';

import AlertList from '@/vue-components/AlertList.vue';
import AcademicYearEvaluationDataTable from '@/vue-components/AcademicYearEvaluationDataTable.vue';

import {
	createDateRangeCell,
	renderDateRangeCell
} from '@/modules/datatable-utils.js';

export default function createAdminFacultyDashboard(el){
	
	return new Vue({
		el,
		data(){
			return {
				alerts: []
			};
		},
		
		computed: {
			facultyEvalsThead(){
				return [[
					'#',
					'Faculty',
					'Form',
					'Evaluator',
					'Evaluation Date',
					''
				]];
			},
			facultyEvalsConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								evaluator: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'faculty'
								}
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
						{data: 'form.title'},
						{data: 'evaluator.full_name'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: null, render(){
							return '';
						}}
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
			AcademicYearEvaluationDataTable
		}
	});
}
