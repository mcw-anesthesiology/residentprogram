<template>
	<div class="form-header">
		<div class="container-fluid">
			<div class='row'>
				<div class='col-md-8'>
					<div class="form-group">
						<label for="form-title">Form title</label>
						<input type="text" v-model.trim="title" id="form-title" class="form-control input-lg" name="formTitle" placeholder="Form Title" required />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="form-type">Form type</label>
						<select class="form-control" v-model="formType" id="form-type" name="form_type" style="margin-bottom: 5px;">
							<option value="resident">Resident/Intern</option>
							<option value="self-resident">Resident/Intern (self)</option>
							<option value="fellow">Fellow</option>
							<option value="self-fellow">Fellow (self)</option>
							<option value="faculty">Faculty</option>
							<option value="staff">Staff</option>
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

import 'whatwg-fetch';

import { appendAlert, ucfirst } from '../modules/utils.js';

export default {
	props: [
		'oldFormContents'
	],
	created(){
		fetch('/milestones', { credentials: 'same-origin' }).then(response => {
			if(response.ok)
				return response.json();
			else {
				let err = new Error(response.statusText);
				err.response = response;
				throw err;
			}
		}).then(milestones => {
			this.milestones = milestones;
			let milestoneGroups = {};
			for(let milestone of milestones){
				let groupTitle = ucfirst(milestone.type);
				if(milestone.training_level)
					groupTitle += ` — ${milestone.training_level}`;
				if(!milestoneGroups[groupTitle])
					milestoneGroups[groupTitle] = {
						text: groupTitle,
						children: []
					};
				milestoneGroups[groupTitle].children.push({
					id: milestone.id.toString(),
					text: milestone.title
				});
			}
			for(let groupTitle in milestoneGroups){
				let milestoneGroup = milestoneGroups[groupTitle];
				milestoneGroup.children.sort((a, b) => {
					if(a.text < b.text)
						return 1;
					else if(a.text > b.text)
						return -1;
					else
						return 0;
				});
			}
			this.groupedMilestones = Object.values(milestoneGroups);
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
			nextQuestionIdNum: 1,
			milestones: [],
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
			this.items.splice(index, 1, Object.assign(this.items[index], item))
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
				items: this.items
			});

			let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('X-Requested-With', 'XMLHttpRequest');
			headers.append('X-CSRF-TOKEN', csrfToken);

			if(this.isFormValid()){
				fetch('/forms', {
					method: 'POST',
					headers: headers,
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
