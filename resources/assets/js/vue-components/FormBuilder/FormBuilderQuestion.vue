<template>
	<div v-bind:id="questionId" class="form-question panel panel-default form-block">
		<div class="panel-heading form-horizontal">
			<div class="panel-title form-group">
				<div class="col-sm-12">
					<label class="containing-label">
						Question Text
						<div class="input-group">
							<span class="question-id input-group-addon">{{questionId}}</span>
							<input type="text" v-bind:value="text" v-on:input="$emit('change', {text: $event.target.value})" class="form-input form-question-text form-control" placeholder="Question Text" required />
						</div>
					</label>
				</div>
			</div>
			<div class="hr-question"></div>
			<div class="row">
				<div class="col-md-4">
					<label class="containing-label">
						Question Type
						<select v-bind:value="questionType" v-on:change="changeQuestionType" class="form-control form-question-type" name="questionType">
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
							<button v-on:click="setStandardOptions" class="form-question-standard-options btn btn-info" type="button">
								Standard
							</button>
						</div>
						<div class="btn-group">
							<button v-bind:disabled="!milestones || milestones.length !== 1" v-on:click="setMilestoneOptions"
									class="form-question-milestone-level-options btn btn-info" type="button">
								Milestone
							</button>
						</div>
						<div class="btn-group">
							<button v-bind:disabled="!customOptions || customOptions.length < 1" v-on:click="setCustomOptions"
									class="form-question-custom-options btn btn-info" type="button">
								Custom
							</button>
						</div>
					</div>
				</div>
				<div class="col-md-1 labelless-button">
					<button v-on:click="$emit('remove')" class="form-block-delete btn btn-danger del-btn" type="button">
						Delete
					</button>
				</div>
				<div class="col-md-1">
					<label class="containing-label">
						Required
						<input type="checkbox" v-bind:checked="required"
							class="form-control form-question-required" value="required"
							v-on:change="$emit('change', {required: $event.target.checked})"
							/>
					</label>
				</div>
			</div>
			<div class="hr-question"></div>
			<div class="row">
				<div class="col-md-8">
					<label v-show="shouldShowMilestonesAndCompetencies" class="containing-label">
						Question Milestones
						<select-two v-bind:value="milestones" v-bind:options="groupedMilestones" v-bind:multiple="true" v-on:input="$emit('change', {milestones: arguments[0]})" class="form-control form-question-milestone"></select-two>
					</label>
				</div>
				<div class="col-md-4">
					<label v-show="shouldShowMilestonesAndCompetencies" class="containing-label">
						Question Competency
						<select v-on:change="$emit('change', {competencies: $event.target.value})" class="form-control form-question-competency" placeholder="Competency">
							<option value="" disabled>Select a competency</option>
							<option v-for="competency of allCompetencies" v-bind:value="competency.id" v-bind:selected="competencies == competency.id">{{ competency.title }}</option>
						</select>
					</label>
				</div>
			</div>
		</div>
		<div class="panel-body">
			<div class="row form-options" style="margin-bottom:5px;">
				<template v-if="['radio', 'radiononnumeric', 'checkbox'].includes(questionType)">
					<form-builder-option v-for="(option, index) of optionsWithWorking"
						v-bind="option" v-bind:type="questionType"
						v-bind:is-working-option="option === workingOption"
						v-on:input="handleWorkingOptionInput(index, arguments[0])"
						v-on:change="handleOptionChange(index, arguments[0])"
						>
					</form-builder-option>
				</template>

				<div v-if="questionType === 'text'" class="col-sm-12">
					<textarea class="form-control" placeholder="Text" disabled />
				</div>

				<div v-if="questionType === 'number'" class="col-md-8">
					<input type="number" class="form-control" placeholder="Number" disabled />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FormBuilderOption from './FormBuilderOption.vue';
import SelectTwo from '../SelectTwo.vue';

import { STANDARD_OPTIONS } from '../../modules/constants.js';
import { appendAlert } from '../../modules/utils.js';

export default {
	props: [
		'formType',
		'groupedMilestones',
		'allCompetencies',
		'questionIdNum',
		'text',
		'questionType',
		'milestones',
		'competencies',
		'options',
		'required',
		'customOptions'
	],
	data(){
		return {
			workingOption: {
				text: '',
				value: '',
				description: ''
			}
		}
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
					options = STANDARD_OPTIONS.RESIDENT;
					break;
				case 'fellow':
				case 'self-fellow':
					options = STANDARD_OPTIONS.FELLOW;
					break;
				case 'faculty':
					if(this.questionType === 'radiononnumeric')
						options = STANDARD_OPTIONS.FACULTY;
					break;
			}

			if(!options){
				appendAlert('No standard options found for form type and question type');
				return;
			}

			this.$emit('change', {options: options});
		},
		setMilestoneOptions(){
			if(this.milestones.length !== 1){
				appendAlert('You can only use milestone options with a single selected milestone');
				return;
			}
			fetch(`/milestones/${this.milestones[0]}`, { credentials: 'same-origin' }).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error(response);
			}).then(milestone => {
				if(!milestone || !milestone.levels || milestone.levels.length < 1){
					appendAlert('No milestone levels found');
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
				appentAlert('No custom options set');
				return;
			}

			this.$emit('change', {options: this.customOptions});
		}
	},
	components: {
		FormBuilderOption,
		SelectTwo
	}
}
</script>

<style scoped>
	.question-id {
		font-size: larger;
		text-transform: uppercase;
		font-weight: bold;
	}
</style>
