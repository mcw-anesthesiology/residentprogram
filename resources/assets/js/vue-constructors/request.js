import Vue from 'vue';

import EvaluationDataTable from '../vue-components/EvaluationDataTable.vue';
import SelectTwo from '../vue-components/SelectTwo.vue';

import moment from 'moment';
import indefinite from 'indefinite';

import { groupUsers, groupForms } from '../modules/utils.js';
import {
	isoDateStringObject,
	renderDateRange,
	currentQuarter,
	lastQuarter
} from '../modules/date-utils.js';
import {
	renderEvaluatorEvalUrl,
	createDateRangeCell,
	renderDateRangeCell,
	createDateTimeCell,
	renderDateTimeCell
} from '../modules/datatable-utils.js';

export function createRequest(el, propsData){

	return new Vue({
		el: el,
		props: {
			user: Object,
			evaluators: Array,
			subjects: Array,
			forms: Array
		},
		propsData,
		data(){
			let requestType = getRequestType();
			return {
				requestType,
				subjectId: null,
				evaluatorId: null,
				formId: null,
				evaluationDateJson: null,

				sendHash: requestType === 'staff',
				forceNotification: false,
				hashExpiresIn: '30',

				allowMultiple: {
					subjects: false,
					evaluators: false,
					evaluationDate: false
				},

				error: {
					subjectId: null,
					evaluatorId: null,
					formId: null,
					evaluationDate: null
				}
			};
		},
		computed: {
			required(){
				let required = {
					subjectId: true,
					evaluatorId: true,
					formId: true,
					evaluationDate: true
				};
				
				if(['resident', 'self'].includes(this.requestType)
						&& this.user.type === 'resident')
					required.subjectId = false;
				
				if((this.requestType === 'resident' && this.user.type === 'faculty')
						|| (this.requestType === 'staff' && this.user.type === 'staff')
						|| (this.requestType === 'faculty' && this.user.type === 'resident')
						|| (this.requestType === 'self'))
					required.evaluatorId = false;
					
				return required;
			},
			requirementsAreMet(){
				return !Object.keys(this.required).some(requirement =>
					this.required[requirement]
						&& (
							!this[requirement]
							|| this[requirement].length === 0
						));
			},
			fieldNouns(){
				return {
					subjectId: 'subject',
					evaluatorId: 'evaluator',
					formId: 'form',
					evaluationDate: 'evaluation date'
				};
			},
			subject(){
				let subjectId = Number(this.subjectId);
				return this.subjects[0].find(subject => subject.id === subjectId);
			},
			evaluatorOptions(){
				return groupUsers(this.evaluators[0]);
			},
			subjectOptions(){
				return groupUsers(this.subjects[0]);
			},
			subjectForms(){
				let forms = this.forms;
				if(this.subjectId && this.subject && this.subject.type === 'resident'){
					forms = this.subject.training_level === 'fellow'
						? forms.filter(form => form.type === 'fellow')
						: forms.filter(form => form.type === 'resident');
				}

				return forms;
			},
			formOptions(){
				return groupForms(this.subjectForms);
			},
			evaluationDate(){
				if(this.evaluationDateJson)
					return Array.isArray(this.evaluationDateJson)
						? this.evaluationDateJson.map(JSON.parse)
						: JSON.parse(this.evaluationDateJson);
			},
			evaluationDates(){
				let form = this.forms.find(form => form.id === Number(this.formId));
				
				if(!form)
					return;
				
				let dates = [];
				if(form.evaluation_period_type === 'quarter'){
					dates = [
						lastQuarter(),
						currentQuarter()
					];
				}
				else {
					let startDate = moment().startOf('month');
					let endDate = moment(endDate).endOf('month');
					for(let i = 0; i < 3; i++){
						dates.push({
							startDate,
							endDate
						});
						startDate = moment(startDate).subtract(1, 'month');
						endDate = moment(startDate).endOf('month');
					}
					dates.reverse();
				}
				
				return dates;
			},
			evaluationDateOptions(){
				if(this.evaluationDates)
					return this.evaluationDates.map(date => {
						return {
							id: JSON.stringify(isoDateStringObject(date)),
							text: renderDateRange(date.startDate, date.endDate)
						};
					});
			},
			pendingFacultyEvalsThead(){
				return [[
					'#',
					'Faculty',
					'Form',
					'Evaluation date',
					'Started',
					'',
				]];
			},
			pendingFacultyEvalsConfig(){
				if(this.user.type !== 'resident' || this.requestType !== 'faculty')
					return;

				return {
					ajax: {
						url: '/evaluations',
						data: {
							whereHas: {
								form: {
									type: 'faculty'
								}
							},
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
								return '<button class="btn btn-danger btn-xs cancel-eval-button" '
									+ 'data-id="' + evaluation.id + '"><span class="glyphicon glyphicon-remove"></span> '
									+ 'Cancel</button>';

							return '';
						}}
					],
					order: [[0, 'desc']],
					createdRow(row){
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeFacultyEvalsThead(){
				return [[
					'#',
					'Faculty',
					'Form',
					'Evaluation date',
					'Started',
					'Completed'
				]];
			},
			completeFacultyEvalsConfig(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							whereHas: {
								form: {
									type: 'faculty'
								}
							},
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							evaluator_id: this.user.id,
							status: 'complete'
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
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
					],
					order: [[0, 'desc']],
					createdRow(row){
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		watch: {
			allowMultiple(allowMultiple){
				Object.keys(allowMultiple).map(field => {
					if(allowMultiple[field] && !Array.isArray(this[field]))
						this[field] = [this[field]];
					else if(!allowMultiple[field] && Array.isArray(this[field]))
						this[field] = this[field][0];
				});
			},
			subjectId(){
				this.checkField('subjectId', 'subject');
			},
			evaluatorId(){
				this.checkField('evaluatorId', 'evaluator');
			},
			formId(){
				this.checkField('formId', 'form');
			},
			evaluationDate(){
				this.checkField('evaluationDate', 'evaluation date');
			},
			evaluationDateOptions(options){
				if(!options && this.evaluationDateJson)
					this.evaluationDateJson = null;

				if(!options || !this.evaluationDateJson)
					return;
				
				if(Array.isArray(this.evaluationDateJson)){
					let newJson = options.filter(({id}) =>
						this.evaluationDateJson.includes(id)
					).map(({id}) => id);
					
					if(newJson.length !== this.evaluationDateJson.length)
						this.evaluationDateJson = newJson;
				}
				else {
					if(!options.some(({id}) => id === this.evaluationDateJson))
						this.evaluationDateJson = null;
				}
			},
			formOptions(){
				let formId = Number(this.formId);
				if(formId && !this.subjectForms.find(form => form.id === formId))
					this.formId = null;
			}
		},
		methods: {
			clearDay(){
				this.$refs.evaluationDayFlatpickr.fp.clear();
			},
			checkField(field, noun){
				this.error[field] = (this.required[field] &&
						(!this[field] || this[field].length === 0))
					? `Please select ${indefinite(noun)}`
					: null;

				return this.error[field];
			},
			checkSubmit(event){
				Object.keys(this.required).map(field => {
					this.checkField(field, this.fieldNouns[field]);
				});

				if(!this.requirementsAreMet)
					event.preventDefault();
			}
		},
		components: {
			EvaluationDataTable,
			SelectTwo
		}
	});
}

function getRequestType(){
	let paths = window.location.pathname.split('/');
	paths = paths.filter(path => path.length > 0);
	let type = paths[paths.length - 1];

	if(['faculty', 'staff', 'self'].includes(type))
		return type;

	return 'resident';
}
