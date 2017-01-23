import Vue from 'vue';

import VueFlatpickr from 'vue-flatpickr';
import SelectTwo from '../vue-components/SelectTwo.vue';

import moment from 'moment';
import indefinite from 'indefinite';

import 'vue-flatpickr/theme/flatpickr.min.css';

import { groupUsers, groupForms } from '../modules/utils.js';
import { currentQuarter, lastQuarter } from '../modules/date-utils.js';

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
				evaluationMonth: null,
				evaluationDay: null,

				sendHash: requestType === 'staff',
				forceNotification: false,
				hashExpiresIn: '30',

				allowMultiple: {
					subjects: false,
					evaluators: false,
					evaluationMonth: false
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
			evaluationDateOptions(){
				// TODO: Make this work with select-two
				
				let form = this.forms.find(form => form.id = Number(this.formId));
				
				let dates = [];
				if(form.evaluation_range_type === 'quarter'){
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
			evaluationDate(){
				return this.evaluationDay || this.evaluationMonth;
			},
			evaluationDayOptions(){
				let minDate, maxDate;
				if(this.evaluationMonth){
					minDate = this.evaluationMonth;
					maxDate = moment(this.evaluationMonth).endOf('month').toDate();
				}

				return {
					minDate,
					maxDate,
					altInput: true,
					altFormat: 'j',
					altInputClass: 'form-control appear-not-readonly'
				};
			}
		},
		watch: {
			subjectId(){
				this.checkField('subjectId', 'subject');
			},
			evaluatorId(){
				this.checkField('evaluatorId', 'evaluator');
			},
			formId(){
				this.checkField('formId', 'form');
			},
			evaluationMonth(evaluationMonth){
				if(Array.isArray(evaluationMonth) && this.evaluationDay)
					this.evaluationDay = null;
			},
			evaluationDate(){
				this.checkField('evaluationDate', 'evaluation date');
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
				
				let errors = false;
				Object.keys(this.required).map(field => {
					if(this.checkField(field, this.fieldNouns[field]))
						errors = true;
				});

				if(errors)
					event.preventDefault();
			}
		},
		components: {
			SelectTwo,
			VueFlatpickr
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
