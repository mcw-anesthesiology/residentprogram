import Vue from 'vue';

import AlertList from '@/vue-components/AlertList.vue';
import AcademicYearEvaluationDataTable from '@/vue-components/AcademicYearEvaluationDataTable.vue';

import {
	renderSubjectEvalUrl,
	renderDateRangeCell,
	createDateRangeCell
} from '@/modules/datatable-utils.js';

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
					'Evaluation form',
					'Academic year'
				]];
			},
			facultyEvalsConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: [
									'title'
								]
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
			},

			faculty360Thead() {
				return [[
					'#',
					'Evaluation form',
					'Academic year'
				]];
			},
			faculty360Config() {
				return {
					ajax: {
						url: '/faculty360/evaluations',
						data: {
							with: {
								form: [
									'title'
								]
							},
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url', render: renderSubjectEvalUrl},
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
			AcademicYearEvaluationDataTable
		}
	});
}
