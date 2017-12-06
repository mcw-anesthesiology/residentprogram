<template>
	<div :id="questionId" class="form-question panel panel-default form-block">
		<div class="panel-heading form-horizontal">
			<div class="panel-title form-group">
				<div class="col-sm-12">
					<label class="containing-label">
						Question Text
						<div class="input-group">
							<span class="question-id input-group-addon">{{questionId}}</span>
							<input type="text" :value="text" @input="$emit('change', {text: $event.target.value})" class="form-input form-question-text form-control" placeholder="Question Text" required />
						</div>
					</label>
				</div>
			</div>
			<div class="hr-question"></div>
			<div class="row">
				<div class="col-md-4">
					<label class="containing-label">
						Question Type
						<select :value="questionType" @change="changeQuestionType" class="form-control form-question-type" name="questionType">
							<option value="radio">Radio</option>
							<option value="text">Text</option>
							<option value="radiononnumeric">Radio (non-numeric)</option>
							<option value="number">Number</option>
							<option value="checkbox">Checkbox</option>
						</select>
					</label>
				</div>
				<div class="col-md-6">
					<label>Question Options</label>
					<div class="btn-group btn-group-justified">
						<div class="btn-group">
							<button @click="setStandardOptions" class="form-question-standard-options btn btn-info" type="button">
								Standard
							</button>
						</div>
						<div class="btn-group">
							<button :disabled="!milestones || milestones.length !== 1" @click="setMilestoneOptions"
									class="form-question-milestone-level-options btn btn-info" type="button">
								Milestone
							</button>
						</div>
						<div class="btn-group">
							<button :disabled="!customOptions || customOptions.length < 1" @click="setCustomOptions"
									class="form-question-custom-options btn btn-info" type="button">
								Custom
							</button>
						</div>
					</div>
				</div>
				<div class="col-md-1 labelless-button">
					<confirmation-button class="form-block-delete btn"
							unpressed-class="btn-danger"
							pressed-class="btn-warning"
							@click="$emit('remove')">
						Delete
						<template slot="pressed">
							Confirm
						</template>
					</confirmation-button>
				</div>
				<div class="col-md-1">
					<label class="containing-label">
						Required
						<input type="checkbox" :checked="required"
							class="form-control form-question-required" value="required"
							@change="$emit('change', {required: $event.target.checked})" />
					</label>
				</div>
			</div>
			<template v-if="showMilestonesCompetencies">
				<div class="hr-question"></div>
				<div class="row">
					<div class="col-md-8">
						<label v-show="shouldShowMilestonesAndCompetencies" class="containing-label">
							Question Milestones
							<select-two :value="milestones" :options="groupedMilestones"
								:multiple="true" @input="$emit('change', {milestones: arguments[0]})"
								class="form-control form-question-milestone" />
						</label>
					</div>
					<div class="col-md-4">
						<label v-show="shouldShowMilestonesAndCompetencies" class="containing-label">
							Question Competency
							<select-two :value="competencies" placeholder="Competency"
								class="form-control form-question-competency"
								:options="competencyOptions" :multiple="true"
								@input="$emit('change', {competencies: arguments[0]})" />
						</label>
					</div>
				</div>
			</template>
		</div>
		<div class="panel-body">
			<div class="row form-options" style="margin-bottom:5px;">
				<template v-if="['radio', 'radiononnumeric', 'checkbox'].includes(questionType)">
					<form-builder-option v-for="(option, index) of optionsWithWorking"
						:key="index" v-bind="option" :type="questionType"
						:is-working-option="option === workingOption"
						@input="handleWorkingOptionInput(index, arguments[0])"
						@change="handleOptionChange(index, arguments[0])" />
				</template>

				<div v-if="questionType === 'text'" class="col-sm-12">
					<textarea class="form-control" placeholder="Text" disabled />
				</div>

				<div v-if="questionType === 'number'" class="col-md-8">
					<input type="number" class="form-control" placeholder="Number" disabled />
				</div>
			</div>
		</div>
		<alert-list v-model="alerts" />
	</div>
</template>

<script>
import FormBuilderOption from './FormBuilderOption.vue';

import AlertList from '@/vue-components/AlertList.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import SelectTwo from '@/vue-components/SelectTwo.vue';

import { STANDARD_OPTIONS } from '@/modules/constants.js';
import { sortSelect2Objects } from '@/modules/utils.js';

export default {
	props: {
		formType: {
			type: String,
			required: true
		},
		groupedMilestones: {
			type: Array,
			required: false
		},
		allCompetencies: {
			type: Array,
			required: false
		},
		questionIdNum: {
			type: Number,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		questionType: {
			type: String,
			required: true
		},
		milestones: {
			type: Array,
			required: false
		},
		competencies: {
			type: Array,
			required: false
		},
		options: {
			type: Array,
			required: false
		},
		required: {
			type: Boolean,
			default: false
		},
		customOptions: {
			type: Array,
			required: false
		},
		showMilestonesCompetencies: {
			type: Boolean,
			default: true
		}
	},
	data(){
		return {
			workingOption: {
				text: '',
				value: '',
				description: ''
			},

			alerts: []
		};
	},
	computed: {
		questionId(){
			return `q${this.questionIdNum}`;
		},
		shouldShowMilestonesAndCompetencies(){
			return ['radio', 'number'].includes(this.questionType) && [
				'resident',
				'self-resident',
				'fellow',
				'self-fellow'
			].includes(this.formType);
		},
		optionsWithWorking(){
			if(this.options){
				let options = this.options.slice();
				options.push(this.workingOption);
				return options;
			}
		},
		workingOptionIndex(){
			if(this.options)
				return this.options.length;
		},
		competencyOptions(){
			return this.allCompetencies.map(competency => ({
				id: competency.id,
				text: competency.title
			})).sort(sortSelect2Objects);
		}
	},
	methods: {
		changeQuestionType(event){
			const questionType = event.target.value;
			let options = [];

			this.$emit('change', {questionType: questionType, options: options});
		},
		handleWorkingOptionInput(index, option){
			if(index === this.workingOptionIndex)
				this.workingOption = Object.assign({}, this.workingOption, option);
		},
		handleOptionChange(index, option){
			if(index === this.workingOptionIndex){
				let options = this.options.slice();
				options.push(Object.assign({}, this.workingOption, option));
				this.workingOption = {
					text: '',
					value: '',
					description: ''
				};
				this.$emit('change', {options: options});
			}
			else {
				let options = this.options.slice();
				options[index] = Object.assign(options[index], option);
				if(!options[index].text && !options[index].value && !options[index].description)
					options.splice(index, 1);

				this.$emit('change', {options: options});
			}
		},

		setStandardOptions(){
			let options;
			switch(this.formType){
				case 'resident':
				case 'self-resident':
					options = STANDARD_OPTIONS.RESIDENT.slice();
					break;
				case 'fellow':
				case 'self-fellow':
					options = STANDARD_OPTIONS.FELLOW.slice();
					break;
				case 'faculty':
					if(this.questionType === 'radiononnumeric')
						options = STANDARD_OPTIONS.FACULTY.slice();
					break;
				case 'intern360':
					options = STANDARD_OPTIONS.NUMERIC_LIKERT.slice();
					break;
			}

			if(!options){
				this.alerts.push({
					type: 'error',
					text: 'No standard options found for form type and question type'
				});
				return;
			}

			this.$emit('change', {options: options});
		},
		setMilestoneOptions(){
			if(this.milestones.length !== 1){
				this.alerts.push({
					type: 'error',
					text: 'You can only use milestone options with a single selected milestone'
				});
				return;
			}
			fetch(`/milestones/${this.milestones[0]}`, { credentials: 'same-origin' }).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error(response);
			}).then(milestone => {
				if(!milestone || !milestone.levels || milestone.levels.length < 1){
					this.alerts.push({
						type: 'error',
						text: 'No milestone levels found'
					});
					return;
				}
				let options = [{
					value: 0,
					text: `Not yet ${milestone.levels[0].name}`
				}];
				for(let level of milestone.levels){
					let value = 2 * parseInt(level.level_number, 10);
					options.push({value: value - 1, text: '', description: ''});
					options.push({value: value, text: level.name, description: level.description});
				}

				this.$emit('change', {options: options});
			}).catch(err => {
				console.error(err);
			});
		},
		setCustomOptions(){
			if(this.customOptions.length < 1){
				this.alerts.push({
					type: 'error',
					text: 'No custom options set'
				});
				return;
			}

			this.$emit('change', {options: this.customOptions.slice()});
		}
	},
	components: {
		FormBuilderOption,
		AlertList,
		ConfirmationButton,
		SelectTwo
	}
};
</script>

<style scoped>
	.question-id {
		font-size: larger;
		text-transform: uppercase;
		font-weight: bold;
	}
</style>
