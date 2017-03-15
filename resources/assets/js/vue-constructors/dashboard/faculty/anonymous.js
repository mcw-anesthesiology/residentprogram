import Vue from 'vue';

import AlertList from '../../../vue-components/AlertList.vue';
import EvaluationDataTable from '../../../vue-components/EvaluationDataTable.vue';

import {
	createDateRangeCell,
	renderDateRangeCell
} from '../../../modules/datatable-utils.js';

export default function createAnonymousFacultyDashboard(el){
	
	return new Vue({
		el,
		data(){
			return {
				alerts: []
			};
		},
		
		computed: {
			anonymousFacultyEvalsThead(){
				return [[
					'#',
					'Faculty',
					'Evaluation form',
					'Evaluation date'
				]];
			},
			anonymousFacultyEvalsConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
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
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						}
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
