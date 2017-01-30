<template>
	<div class="form-header">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="form-title">Form title</label>
						<input type="text" v-model.trim="title" id="form-title" class="form-control input-lg" name="formTitle" placeholder="Form Title" required />
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
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
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="form-body">
			<div class="form-items">
				<template v-for="(item, index) of items">
					<form-builder-instruction v-if="item.type === 'instruction'" v-bind="item" v-on:change="changeItem(index, $event)" v-on:input="changeItem(index, $event)" v-on:remove="removeItem(index)"></form-builder-instruction>
					<form-builder-question v-if="item.type === 'question'" v-bind="item" v-bind:formType="formType" v-bind:groupedMilestones="groupedMilestones" v-bind:allCompetencies="competencies" v-bind:customOptions="customOptions" v-on:change="changeItem(index, $event)" v-on:remove="removeItem(index)"></form-builder-question>
				</template>
			</div>
		</div>
		<div id="form-footer">
			<button type="button" v-on:click="addInstruction" class="btn btn-default" id="add-instruction-block">Add instruction block</button>
			<button type="button" v-on:click="addQuestion" class="btn btn-info" id="addQuestion">Add Question</button>
			<button type="submit" v-on:click="submitForm" class="btn btn-success">Submit Form</button>
		</div>
	</div>
</template>

<script>
import FormBuilderInstruction from './FormBuilderInstruction.vue';
import FormBuilderQuestion from './FormBuilderQuestion.vue';

import {
	appendAlert,
	getFetchHeaders,
	fetchMilestoneGroups
} from '../../modules/utils.js';

export default {
	props: [
		'oldFormContents'
	],
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
			customOptions: []
		};
	},
	methods: {
		addInstruction(){
			this.items.push({
				type: 'instruction',
				text: ''
			});
		},
		addQuestion(){
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
		changeItem(index, item){
			this.items.splice(index, 1, Object.assign(this.items[index], item));
		},
		removeItem(index){
			let item = this.items[index];
			if(item.type === 'question' && item.questionIdNum === this.nextQuestionIdNum - 1)
				this.nextQuestionIdNum--;
			this.items.splice(index, 1);
		},
		submitForm(event){
			event.preventDefault();
			let requestBody = JSON.stringify({
				title: this.title,
				formType: this.formType,
				evaluation_period_type: this.periodType,
				items: this.items.map(item => {
					item.questionId = `q${item.questionIdNum}`;
					return item;
				})
			});

			if(this.isFormValid()){
				fetch('/forms', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: requestBody
				}).then(response => {
					if(response.ok)
						return response.text();
					else
						throw new Error(response);
				}).then(response => {
					if(response === 'success')
						window.location = '/manage/forms';
					else
						throw new Error(response);
				}).catch(err => {
					appendAlert('Error saving form');
					console.error(err);
				});
			}
		},
		isFormValid(){
			if(!this.title){
				appendAlert('Please enter a title for the form');
				return false;
			}

			if(!this.items || this.items.length < 1){
				appendAlert('Please enter at least one question');
				return false;
			}

			for(let item of this.items){
				if(item.type === 'question'){
					if(!item.text){
						appendAlert(`Please enter question text for question ${item.questionIdNum}`);
						return false;
					}
					if(['radio', 'radiononnumeric', 'checkbox'].includes(item.questionType)){
						if(!item.options || item.options.length < 1){
							appendAlert(`Please add at least one option for each multiple-choice question`);
							return false;
						}

						for(let option of item.options){
							if(!option.value){
								appendAlert(`An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question ${item.questionIdNum}`);
								return false;
							}
						}
					}
				}
				else if(item.type === 'instruction'){
					if(!item.text){
						appendAlert('Please complete or remove all empty instruction blocks');
						return false;
					}
				}
				else {
					appendAlert('Unrecognized item type in form');
					return false;
				}
			}

			return true;
		}
	},
	watch: {
		oldFormContents(formContents){
			this.title = formContents.title;
			this.formType = formContents.formType;
			this.items = formContents.items.slice();
			for(let item of this.items){
				if(item.questionIdNum && item.questionIdNum >= this.nextQuestionIdNum)
					this.nextQuestionIdNum = item.questionIdNum + 1;
			}
		}
	},
	components: {
		FormBuilderInstruction,
		FormBuilderQuestion
	}
};
</script>

<style scoped>

</style>
