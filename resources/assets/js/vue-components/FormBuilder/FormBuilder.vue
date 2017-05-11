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
					<div class="form-group" v-if="!fixedPeriodType">
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
							v-bind="item" :form-type="formType"
							:grouped-milestones="groupedMilestones"
							:all-competencies="competencies"
							:custom-options="customOptions"
							:show-milestones-competencies="showMilestonesCompetencies"
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
			<div>
				<button type="button" class="btn btn-default"
						id="add-instruction-block"
						@click="addInstruction">
					<span class="glyphicon glyphicon-pencil"></span>
					Add instruction block
				</button>
				<button type="button" class="btn btn-info" id="addQuestion"
						@click="addQuestion">
					<span class="glyphicon glyphicon-question-sign"></span>
					Add question
				</button>
				<show-hide-button class="btn btn-default"
						v-model="show.customOptionsEditor">
					custom options editor
				</show-hide-button>
			</div>

			<div v-if="show.customOptionsEditor"
					class="custom-options-editor-container">
				<textarea class="custom-options-editor form-control"
					rows="10"
					:value="customOptionsString"
					@change="changeCustomOptions">
				</textarea>
			</div>

			<div class="btn-lg-submit-container">
				<confirmation-button class="btn btn-lg btn-primary"
						@click="submitForm">
					Submit form
				</confirmation-button>
			</div>
		</div>
	</div>
</template>

<script>
import FormBuilderInstruction from './FormBuilderInstruction.vue';
import FormBuilderQuestion from './FormBuilderQuestion.vue';
import AlertList from '../AlertList.vue';
import ShowHideButton from '../ShowHideButton.vue';
import ConfirmationButton from '../ConfirmationButton.vue';

import { fetchMilestoneGroups } from 'modules/utils.js';

export default {
	props: {
		oldFormContents: {
			type: Object,
			required: false
		},
		fixedFormType: {
			type: String,
			required: false
		},
		fixedPeriodType: {
			type: String,
			required: false
		},
		defaultFormType: {
			type: String,
			required: false
		},
		defaultPeriodType: {
			type: String,
			required: false
		},
		showMilestonesCompetencies: {
			type: Boolean,
			default: true
		}
	},
	data(){
		return {
			title: '',
			formType: this.fixedFormType || this.defaultFormType || 'resident',
			periodType: this.fixedPeriodType || this.defaultPeriodType || 'month',
			nextQuestionIdNum: 1,
			groupedMilestones: [],
			competencies: [],
			items: [],
			customOptions: [],

			show: {
				customOptionsEditor: false
			},

			alerts: []
		};
	},

	mounted(){
		if (this.showMilestonesCompetencies) {
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
		}
	},

	computed: {
		customOptionsString() {
			try {
				return JSON.stringify(this.customOptions, null, 4);
			} catch (e) {
				console.error(e);
			}

			return 'ERROR DISPLAYING CUSTOM OPTIONS';
		}
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
				milestones: null,
				competencies: null,
				options: [],
				required: false,
				weight: 100
			});
		},
		changeItem(index, item) {
			this.items.splice(index, 1, Object.assign({}, this.items[index], item));
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
		changeCustomOptions(event) {
			try {
				let customOptions = JSON.parse(event.target.value);
				if (Array.isArray(customOptions))
					this.customOptions = customOptions;
				else
					throw new Error('Not an array');
			} catch (err) {
				console.error(err);
				this.alerts.push({
					type: 'error',
					text: 'Unable to set custom options'
				});
			}
		},
		submitForm() {
			if (this.isFormValid()) {
				this.$emit('submit', {
					title: this.title,
					formType: this.formType,
					evaluation_period_type: this.periodType,
					items: this.items.map(item => {
						if (item.type === 'question')
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
		AlertList,
		ShowHideButton,
		ConfirmationButton
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

	.custom-options-editor {
		display: block;
		margin: 1em auto;
		font-family: monospace;
		white-space: pre;
	}
</style>
