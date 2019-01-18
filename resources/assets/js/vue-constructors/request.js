import Vue from './vue.js';
import VueFlatpickr from '@jacobmischka/vue-flatpickr';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import EvaluationDataTable from '@/vue-components/EvaluationDataTable.vue';
import SelectTwo from '@/vue-components/SelectTwo.vue';
import MarkdownEditor from '@/vue-components/MarkdownEditor.vue';

import moment from 'moment';
import indefinite from 'indefinite';

import { handleError, logError } from '@/modules/errors.js';
import { groupUsers, groupForms } from '@/modules/utils.js';
import {
	isoDateString,
	isoDateStringObject,
	renderDateRange,
	currentYear,
	lastYear,
	academicYearForDate,
	semestersInAcademicYear,
	quartersInAcademicYear,
	monthsInAcademicYear
} from '@/modules/date-utils.js';
import {
	renderEvaluatorEvalUrl,
	createDateRangeCell,
	renderDateRangeCell,
	createDateTimeCell,
	renderDateTimeCell
} from '@/modules/datatable-utils.js';
import { fetchConfig, jsonOrThrow } from '@/modules/utils.js';

const REQUEST_TYPES = [
	'faculty',
	'app',
	'staff',
	'intern360',
	'self'
];

export function createRequest(el, propsData) {

	return new Vue({
		mixins: [HasAlerts],
		el: el,
		props: {
			user: Object,
			evaluators: Array,
			subjects: Array,
			forms: Array
		},
		propsData,
		data() {
			let requestType = getRequestType();

			return {
				requestType,
				subjectId: null,
				evaluatorId: null,
				formId: null,
				evaluationDateJson: null,
				useCustomEvaluationDate: false,
				customEvaluationDate: null,

				subjectFilter: mapNumbersIfExists(getSearchFilter('subject')),
				evaluatorFilter: mapNumbersIfExists(getSearchFilter('evaluator')),
				formFilter: mapNumbersIfExists(getSearchFilter('form')),
				evaluationDateFilter: {
					startDate: getSearchParam('startDate'),
					endDate: getSearchParam('endDate')
				},

				requestNote: '',
				requestNoteHtml: '',

				sendHash: requestType === 'staff',
				forceNotification: false,
				hashExpiresIn: '30',

				schedule: false,
				requestDate: isoDateString(new Date()),

				blocks: [],

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
			flatpickrOptions() {
				let academicYear = academicYearForDate(new Date());

				return {
					altInput: true,
					altInputClass: 'form-control appear-not-readonly',
					enableTime: true,
					enableSeconds: true,
					minuteIncrement: 60,
					minDate: academicYear.startDate,
					maxDate: academicYear.endDate
				};
			},
			customEvalFlatpickrOptions() {
				return {
					altInput: true,
					altInputClass: 'form-control appear-not-readonly',
					mode: 'range'
				};
			},
			required() {
				let required = {
					subjectId: true,
					evaluatorId: true,
					formId: true,
					evaluationDate: true
				};

				if (
					(
						['resident', 'self'].includes(this.requestType)
						&& this.user.type === 'resident'
					)
					|| this.requestType === 'app' && this.user.type === 'app'
					|| (
						this.requestType === 'intern360'
						&& this.user.type === 'resident'
						&& this.user.training_level === 'intern'
					)
				)
					required.subjectId = false;

				if (this.requestorIsEvaluator)
					required.evaluatorId = false;

				return required;
			},
			requirementsAreMet() {
				return !Object.keys(this.required).some(requirement =>
					this.required[requirement]
						&& (
							!this[requirement]
							|| this[requirement].length === 0
						));
			},
			fieldNouns() {
				return {
					subjectId: 'subject',
					evaluatorId: 'evaluator',
					formId: 'form',
					evaluationDate: 'evaluation date'
				};
			},
			subject() {
				let subjectId = Number(this.subjectId);
				return this.subjects[0].find(subject => subject.id === subjectId);
			},
			filteredEvaluators() {
				if (!this.evaluators)
					return;
				if (!this.evaluatorFilter)
					return this.evaluators[0];

				return this.evaluators[0].filter(user =>
					this.evaluatorFilter.includes(user.id)
				);
			},
			filteredSubjects() {
				if (!this.subjects)
					return;
				if (!this.subjectFilter)
					return this.subjects[0];

				return this.subjects[0].filter(user =>
					this.subjectFilter.includes(user.id)
				);
			},
			filteredForms() {
				if (!this.forms)
					return;
				if (!this.formFilter)
					return this.forms;

				return this.forms.filter(form =>
					this.formFilter.includes(form.id)
				);
			},
			evaluatorOptions() {
				return groupUsers(this.filteredEvaluators);
			},
			subjectOptions() {
				return groupUsers(this.filteredSubjects);
			},
			subjectForms() {
				let forms = this.filteredForms;
				if (this.subjectId && this.subject && this.subject.type === 'resident') {
					if (this.subject.training_level === 'fellow') {
						forms = forms.filter(form => form.type === 'fellow');
					} else if (this.subject.training_level === 'intern') {
						forms = forms.filter(form => ['resident', 'intern'].includes(form.type));
					} else {
						forms = forms.filter(form => form.type === 'resident');
					}
				}

				return forms;
			},
			formOptions() {
				return groupForms(this.subjectForms);
			},
			evaluationDate() {
				if (this.useCustomEvaluationDate && this.customEvaluationDate) {
					try {
						let [ startDate, endDate ] = this.customEvaluationDate
							.split('to').map(s => s.trim());

						return {
							startDate,
							endDate
						};
					} catch (e) {
						logError('Error with custom eval date, using non-custom', e);
					}
				}

				if (this.evaluationDateJson)
					return Array.isArray(this.evaluationDateJson)
						? this.evaluationDateJson.map(JSON.parse)
						: JSON.parse(this.evaluationDateJson);
			},
			evaluationDates() {
				let form = this.forms.find(form => form.id === Number(this.formId));

				if (!form)
					return;

				let dates = [];

				if (this.user.type === 'admin' && this.schedule) {
					let requestDate = moment(this.requestDate);
					switch (form.evaluation_period_type) {
						case 'year':
							dates = [
								currentYear()
							];
							break;
						case 'semester':
							dates = semestersInAcademicYear().filter(semester =>
								semester.startDate <= requestDate
							);
							break;
						case 'quarter':
							dates = quartersInAcademicYear().filter(quarter =>
								quarter.startDate <= requestDate
							);
							break;
						case 'month':
							dates = monthsInAcademicYear().filter(month =>
								month.startDate <= requestDate
							);
							break;
						case 'block':
						default:
							dates = this.blocks.filter(block =>
								moment(block.start_date) <= requestDate
							);
							break;
					}
				} else {
					let today = moment();
					let threeMonthsAgo = moment().subtract(3, 'months');
					switch (form.evaluation_period_type) {
						case 'year':
							dates = [
								currentYear()
							];

							if (today.month() === 6 && form.type === 'faculty') {
								dates.unshift(lastYear());
							}
							break;
						case 'semester':
							dates = semestersInAcademicYear().filter(semester =>
								semester.startDate <= today
									&& semester.endDate >= threeMonthsAgo
							);
							break;
						case 'quarter':
							dates = quartersInAcademicYear().filter(quarter =>
								quarter.startDate <= today
									&& quarter.endDate >= threeMonthsAgo
							);
							break;
						case 'month':
							dates = monthsInAcademicYear().filter(month =>
								month.startDate <= today
									&& month.endDate >= threeMonthsAgo
							);
							break;
						case 'block':
						default:
							dates = this.blocks.filter(block =>
								moment(block.start_date) <= today
									&& moment(block.end_date) >= threeMonthsAgo
							);
							break;
					}
				}

				return dates;
			},
			evaluationDateOptions() {
				if (this.evaluationDates)
					return this.evaluationDates.map(date => {
						return date.block_name
							? {
								id: JSON.stringify({
									startDate: isoDateString(date.start_date),
									endDate: isoDateString(date.end_date)
								}),
								text: date.block_name
							}
							: {
								id: JSON.stringify(isoDateStringObject(date)),
								text: renderDateRange(date.startDate, date.endDate)
							};
					});
			},
			requestorIsEvaluator() {
				return (
						(this.requestType === 'resident' && ['faculty', 'app'].includes(this.user.type))
						|| (this.requestType === 'staff' && this.user.type === 'staff')
						|| (this.requestType === 'faculty' && this.user.type === 'resident')
						|| (this.requestType === 'app' && this.user.type === 'faculty')
						|| (
							this.requestType === 'intern360'
							&& (
								this.user.type === 'faculty'
								|| (
									this.user.type === 'resident'
									&& ['ca-1', 'ca-2', 'ca-3', 'fellow'].includes(this.user.training_level)
								)
							)
						)
					|| (this.requestType === 'self')
				);
			},
			pendingFacultyEvalsThead() {
				return [[
					'#',
					'Faculty',
					'Form',
					'Evaluation date',
					'Started',
					'',
				]];
			},
			pendingFacultyEvalsConfig() {
				if (this.user.type !== 'resident' || this.requestType !== 'faculty')
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
							if (evaluation.requested_by_id === this.user.id)
								return '<button class="btn btn-danger btn-xs cancel-eval-button" '
									+ 'data-id="' + evaluation.id + '"><span class="glyphicon glyphicon-remove"></span> '
									+ 'Cancel</button>';

							return '';
						}}
					],
					order: [[0, 'desc']],
					createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeFacultyEvalsThead() {
				return [[
					'#',
					'Faculty',
					'Form',
					'Evaluation date',
					'Started',
					'Completed'
				]];
			},
			completeFacultyEvalsConfig() {
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
					createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		mounted() {
			this.fetchBlocks();

			if (
				this.filteredEvaluators
				&& this.filteredEvaluators.length === 1
				&& this.required.evaluatorId
			)
				this.evaluatorId = this.filteredEvaluators[0].id;

			if (
				this.filteredSubjects
				&& this.filteredSubjects.length === 1
				&& this.required.subjectId
			)
				this.subjectId = this.filteredSubjects[0].id;

			if (
				this.filteredForms
				&& this.filteredForms.length === 1
				&& this.required.formId
			)
				this.formId = this.filteredForms[0].id;

		},

		watch: {
			allowMultiple(allowMultiple) {
				Object.keys(allowMultiple).map(field => {
					if (allowMultiple[field] && !Array.isArray(this[field]))
						this[field] = [this[field]];
					else if (!allowMultiple[field] && Array.isArray(this[field]))
						this[field] = this[field][0];
				});
			},
			subjectId() {
				this.checkField('subjectId', 'subject');
			},
			evaluatorId() {
				this.checkField('evaluatorId', 'evaluator');
			},
			formId() {
				this.checkField('formId', 'form');
			},
			evaluationDate() {
				this.checkField('evaluationDate', 'evaluation date');
			},
			evaluationDateOptions(options) {
				if (this.evaluationDateJson) {
					if (!options)
						this.evaluationDateJson = null;
				} else if (this.evaluationDateFilter) {
					this.evaluationDateJson = JSON.stringify(this.evaluationDateFilter);
				}

				if (!options || !this.evaluationDateJson)
					return;

				if (Array.isArray(this.evaluationDateJson)) {
					let newJson = options.filter(({id}) =>
						this.evaluationDateJson.includes(id)
					).map(({id}) => id);

					if (newJson.length !== this.evaluationDateJson.length)
						this.evaluationDateJson = newJson;
				} else {
					if (!options.some(({id}) => id === this.evaluationDateJson))
						this.evaluationDateJson = null;
				}
			},
			formOptions() {
				let formId = Number(this.formId);
				if (formId && !this.subjectForms.find(form => form.id === formId))
					this.formId = null;
			}
		},

		methods: {
			clearDay() {
				this.$refs.evaluationDayFlatpickr.fp.clear();
			},
			checkField(field, noun) {
				this.error[field] = (this.required[field] &&
						(!this[field] || this[field].length === 0))
					? `Please select ${indefinite(noun)}`
					: null;

				return this.error[field];
			},
			checkSubmit(event) {
				Object.keys(this.required).map(field => {
					this.checkField(field, this.fieldNouns[field]);
				});

				if (!this.requirementsAreMet)
					event.preventDefault();
			},
			fetchBlocks() {
				const academicYear = currentYear();
				const year = `${academicYear.startDate.year()}-${academicYear.endDate.year()}`;
				const query = $.param({
					year
				});
				fetch(`/blocks?${query}`, {
					...fetchConfig()
				}).then(jsonOrThrow).then(blocks => {
					this.blocks = blocks;
				}).catch(err => {
					handleError(err, this, "There was a problem fetching this year's blocks");
				});
			}
		},

		components: {
			VueFlatpickr,
			MarkdownEditor,
			EvaluationDataTable,
			SelectTwo
		}
	});
}

function getRequestType() {
	let paths = window.location.pathname.split('/');
	paths = paths.filter(path => path.length > 0);
	let type = paths[paths.length - 1];

	return REQUEST_TYPES.includes(type)
		? type
		: 'resident';
}

function getSearchParam(prop) {
	let params = new URLSearchParams(window.location.search);
	return params.has(prop)
		? params.get(prop)
		: null;
}

function getSearchFilter(prop) {
	let params = new URLSearchParams(window.location.search);
	return params.has(prop)
		? params.getAll(prop)
		: null;
}

function mapNumbersIfExists(arr) {
	return arr
		? arr.map(val => Number(val))
		: null;
}
