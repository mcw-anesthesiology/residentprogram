<template>
	<section>
		<h2>Needs evaluations</h2>
		
		<email-editor v-if="show.emailEditor"
			from="reminders"
			target="/emails/reminders"
			title="Send reminders"
			defaultSubject="Please request evaluations!"
			:defaultTo="selectedUsers"
			:possibleRecipients="trainees"
			:defaultBodyMarkdown="defaultEmailMarkdown"
			:emailReplacements="emailReplacements"
			:additionalFields="additionalEmailFields"
			@close="show.emailEditor = false" />
		<div v-else class="show-email-button-container">
			<button type="button" class="btn btn-primary"
					@click="show.emailEditor = true">
				<span class="glyphicon glyphicon-send"></span>
				Send reminders
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
import EvaluationListItem from './EvaluationListItem.vue';
import ComponentList from '../../ComponentList.vue';
import EmailEditor from '../../EmailEditor.vue';

import { groupUsers } from '../../../modules/utils.js';
import { ADMIN_EMAIL } from '../../../modules/constants.js';

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
		defaultEmailMarkdown(){
			return `Hello Dr. [[Name]]

You have [[# Completed]] evaluations completed for between ${this.dates.startDate} and ${this.dates.endDate}.

**You are required to have ${this.evalThreshold} evaluations completed for this period.** Please request at least [[# Needed]] more evaluations as soon as possible.

If you have any issues or questions about the system, please contact ${ADMIN_EMAIL}.

Thank you!`;

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

	.evaluation-list-item:nth-child(even) {
		
	}
</style>
