import Vue from 'vue';

import AlertList from '../../../vue-components/AlertList.vue';
import EvaluationDataTable from '../../../vue-components/EvaluationDataTable.vue';

import {
	renderSubjectEvalUrl
} from '../../../modules/datatable-utils.js';

export default function createFacultyFacultyDashboard(el, propsData){
	
	return new Vue({
		el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		data(){
			return {
				alerts: []
			};
		},
		propsData,
		
		computed: {
			facultyEvalsThead(){
				return [[
					'#',
					'Evaluation form'
				]];
			},
			facultyEvalsConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'faculty'
								}
							},
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url', render: renderSubjectEvalUrl},
						{data: 'form.title'}
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
