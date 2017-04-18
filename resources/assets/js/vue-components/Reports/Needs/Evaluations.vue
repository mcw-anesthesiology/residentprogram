<template>
	<section>
		<h2>Needs evaluations</h2>
		
		<div v-if="show.emailEditor" class="panel panel-default email-editor-container">
			<div class="panel-body">
				<email-editor
					from="reminders"
					target="/emails/reminders"
					title="Send reminders"
					defaultSubject="Please request evaluations!"
					:defaultTo="selectedUsers"
					:possibleRecipients="trainees"
					:defaultBodyMarkdown="markdownTemplates.get(markdownTemplate)"
					:emailReplacements="emailReplacements"
					:additionalFields="additionalEmailFields"
					@close="show.emailEditor = false" />
				<label class="containing-label">
					Email template
					<select class="form-control" v-model="markdownTemplate">
						<option v-for="template of Array.from(markdownTemplates.keys())"
								:value="template">
							{{ template }}
						</option>
					</select>
				</label>
			</div>
		</div>
		
		<div v-else class="show-email-button-container">
			<button type="button" class="btn btn-primary"
					@click="show.emailEditor = true">
				<span class="glyphicon glyphicon-pencil"></span>
				Compose reminders
			</button>
		</div>
		
		<section>
			<component-list :items="trainees" :fields="traineeFields">
				<template scope="item">
					<evaluation-list-item :user="item" />
				</template>
			</component-list>
		</section>
		
	</section>
</template>

<script>
import moment from 'moment';

import EvaluationListItem from './EvaluationListItem.vue';
import ComponentList from '../../ComponentList.vue';
import EmailEditor from '../../EmailEditor.vue';

import { groupUsers } from 'modules/utils.js';
import { ADMIN_EMAIL } from 'modules/constants.js';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		},
		evalThreshold: {
			required: true
		},
		trainees: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			selectedUsers: [],
			markdownTemplate: 'Default',
			show: {
				emailEditor: false
			}
		};
	},
	computed: {
		traineeFields(){
			return [
				'full_name',
				'training_level'
			];
		},
		markdownTemplates(){
			let startDate = moment(this.dates.startDate).format('LL');
			let endDate = moment(this.dates.endDate).format('LL');
			return new Map([
				[
					'Default',
					`Hello Dr. [[Name]],

You have [[# Completed]] evaluations completed for between ${startDate} and ${endDate}.

**You are required to have ${this.evalThreshold} evaluations completed for this period.**
Please request at least [[# Needed]] more evaluations as soon as possible.

If you have any issues or questions about the system, please contact [${ADMIN_EMAIL}](mailto:${ADMIN_EMAIL}).

Thank you!`
				],
				[
					'CCC',
					`Hello Dr. [[Name]],

The Clinical Competency Committee will be meeting soon to evaluate your performance from ${startDate} to ${endDate}.

You currently have [[# Completed]] evaluations completed for this period;
however, **you are required to have ${this.evalThreshold} evaluations completed for this period.**
Please request at least [[# Needed]] more evaluations as soon as possible.

If you have any issues or questions about the system, please contact [${ADMIN_EMAIL}](mailto:${ADMIN_EMAIL}).

Thank you!`
				]
			]);
		},
		emailReplacements(){
			return [
				'Name',
				'# Completed',
				'# Needed'
			];
		},
		additionalEmailFields(){
			return {
				evalsRequired: this.evalThreshold
			};
		}
	},
	methods: {
		groupUsers
	},
	components: {
		EvaluationListItem,
		ComponentList,
		EmailEditor
	}
};
</script>

<style scoped>
	.show-email-button-container {
		text-align: right;
		margin-bottom: 20px;
	}

	.email-editor-container {
		margin-bottom: 60px;
	}
</style>
