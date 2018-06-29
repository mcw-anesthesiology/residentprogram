import Vue from '@/vue-constructors/index.js';

import AlertList from '@/vue-components/AlertList.vue';
import AcademicYearEvaluationDataTable from '@/vue-components/AcademicYearEvaluationDataTable.vue';

import {
	createDateRangeCell,
	renderDateRangeCell
} from '@/modules/datatable-utils.js';

export default function createAnonymousFacultyDashboard(el, propsData){

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
			anonymousFacultyEvalsThead(){
				return [[
					'#',
					'Faculty',
					'Evaluation form',
					'Academic year'
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
			},

			anonymousFaculty360Thead() {
				return [[
					'#',
					'Faculty',
					'Evaluation form',
					'Academic year'
				]];
			},
			anonymousFaculty360Config() {
				return {
					ajax: {
						url: '/faculty360/evaluations',
						data: {
							with: {
								subject: [
									'full_name'
								],
								form: [
									'title'
								]
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
			AcademicYearEvaluationDataTable
		}
	});
}
