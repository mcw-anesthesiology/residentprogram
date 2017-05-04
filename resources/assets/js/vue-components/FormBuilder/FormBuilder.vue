<template>
	<div class="form-header">
		<div class="container-fluid">
			<div class="row">
				<div :class="fixedFormType ? 'col-md-9' : 'col-md-6'">
					<div class="form-group">
						<label for="form-title">Form title</label>
						<input type="text" v-model.trim="title" id="form-title"
							class="form-control input-lg" name="formTitle"
							placeholder="Form Title" required />
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group" v-if="!fixedFormType">
						<label for="form-type">Form type</label>
						<select class="form-control input-lg" v-model="formType" id="form-type" name="form_type">
							<option value="resident">Resident/Intern</option>
							<option value="self-resident">Resident/Intern (self)</option>
							<option value="fellow">Fellow</option>
							<option value="self-fellow">Fellow (self)</option>
							<option value="faculty">Faculty</option>
							<option value="staff">Staff</option>
						</select>
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<label for="form-period-type">Evaluation period type</label>
						<select class="form-control input-lg" v-model="periodType" id="form-period-type">
							<option value="month">Month</option>
							<option value="quarter">Quarter</option>
							<option value="year">Year</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="form-body">
			<div class="form-items">
				<template v-for="(item, index) of items">
					<div class="form-item">
						<form-builder-instruction v-if="item.type === 'instruction'"
							v-bind="item" @change="changeItem(index, $event)"
							@input="changeItem(index, $event)"
							@remove="removeItem(index)">
						</form-builder-instruction>
						<form-builder-question v-if="item.type === 'question'"
							v-bind="item" :formType="formType"
							:groupedMilestones="groupedMilestones"
							:allCompetencies="competencies"
							:customOptions="customOptions"
							@change="changeItem(index, $event)"
							@remove="removeItem(index)">
						</form-builder-question>
						<div class="btn-group-vertical">
							<button type="button" class="btn btn-default"
									:disabled="index === 0"
									@click="moveItem(index, index - 1)">
								<span class="glyphicon glyphicon-arrow-up"></span>
							</button>
							<button type="button" class="btn btn-default"
									:disabled="index === items.length - 1"
									@click="moveItem(index, index + 1)">
								<span class="glyphicon glyphicon-arrow-down"></span>
							</button>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div id="form-footer">
			<alert-list v-model="alerts" />
			<button type="button" class="btn btn-default"
					id="add-instruction-block"
					@click="addInstruction">
				Add instruction block
			</button>
			<button type="button" class="btn btn-info" id="addQuestion"
					@click="addQuestion">
				Add question
			</button>
			<button type="submit" class="btn btn-success"
					@click="submitForm">
				Submit form
			</button>
		</div>
	</div>
</template>

<script>
import FormBuilderInstruction from './FormBuilderInstruction.vue';
import FormBuilderQuestion from './FormBuilderQuestion.vue';
import AlertList from '../AlertList.vue';

import { fetchMilestoneGroups } from 'modules/utils.js';

export default {
	props: {
		oldFormContents: {
			type: Object,
			required: false
		},
		fixedFormType: {
			type: Boolean,
			default: false
		}
	},
	created(){
		fetchMilestoneGroups().then(milestoneGroups => {
			this.groupedMilestones = milestoneGroups;
		}).catch(err => {
			console.error(err);
		});

		fetch('/competencies', { credentials: 'same-origin' }).then(response => {
			if(response.ok)
				return response.json();
			else {
				let err = new Error(response.statusText);
				err.response = response;
				throw err;
			}
		}).then(competencies => {
			this.competencies = competencies;
		}).catch(err => {
			console.error(err);
		});
	},
	data(){
		return {
			title: '',
			formType: 'resident',
			periodType: 'month',
			nextQuestionIdNum: 1,
			groupedMilestones: [],
			competencies: [],
			items: [],
			customOptions: [],
			
			alerts: []
		};
	},
	methods: {
		addInstruction() {
			this.items.push({
				type: 'instruction',
				text: ''
			});
		},
		addQuestion() {
			this.items.push({
				type: 'question',
				text: '',
				questionIdNum: this.nextQuestionIdNum++,
				questionType: 'radio',
				milestones: [],
				competencies: '',
				options: [],
				required: false,
				weight: 100
			});
		},
		changeItem(index, item) {
			this.items.splice(index, 1, Object.assign(this.items[index], item));
		},
		moveItem(index, newIndex) {
			this.items.splice(newIndex, 0, this.items.splice(index, 1)[0]);
			this.adjustQuestionIdNums();
		},
		removeItem(index) {
			this.items.splice(index, 1);
			this.adjustQuestionIdNums();
		},
		adjustQuestionIdNums() {
			this.items = this.items.map((item, index) =>
				Object.assign({}, item, {questionIdNum: index + 1})
			);
			this.nextQuestionIdNum = this.items.length;
		},
		submitForm(event) {
			event.preventDefault();
			if (this.isFormValid()) {
				this.$emit('submit', {
					title: this.title,
					formType: this.formType,
					evaluation_period_type: this.periodType,
					items: this.items.map(item => {
						item.questionId = `q${item.questionIdNum}`;
						return item;
					})
				});
			}
		},
		isFormValid() {
			if (!this.title) {
				this.alerts.push({
					type: 'error',
					text: 'Please enter a title for the form'
				});
				return false;
			}

			if (!this.items || this.items.length < 1) {
				this.alerts.push({
					type: 'error',
					text: 'Please enter at least one question'
				});
				return false;
			}

			for (let item of this.items) {
				if (item.type === 'question') {
					if (!item.text) {
						this.alerts.push({
							type: 'error',
							text: `Please enter question text for question ${item.questionIdNum}`
						});
						return false;
					}
					if (['radio', 'radiononnumeric', 'checkbox'].includes(item.questionType)) {
						if(!item.options || item.options.length < 1){
							this.alerts.push({
								type: 'error',
								text: `Please add at least one option for each multiple-choice question`
							});
							return false;
						}

						for (let option of item.options) {
							if (!('value' in option)) {
								this.alerts.push({
									type: 'error',
									text: `An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question ${item.questionIdNum}`
								});
								return false;
							}
						}
					}
				}
				else if (item.type === 'instruction') {
					if (!item.text) {
						this.alerts.push({
							type: 'error',
							text: 'Please complete or remove all empty instruction blocks'
						});
						return false;
					}
				}
				else {
					this.alerts.push({
						type: 'error',
						text: 'Unrecognized item type in form'
					});
					return false;
				}
			}

			return true;
		}
	},
	watch: {
		oldFormContents(formContents) {
			this.title = formContents.title;
			this.formType = formContents.formType;
			this.items = formContents.items.slice();
			for (let item of this.items) {
				if (item.questionIdNum && item.questionIdNum >= this.nextQuestionIdNum)
					this.nextQuestionIdNum = item.questionIdNum + 1;
			}
		}
	},
	components: {
		FormBuilderInstruction,
		FormBuilderQuestion,
		AlertList
	}
};
</script>

<style scoped>
	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.form-item .form-block {
		flex-grow: 1;
	}
</style>
