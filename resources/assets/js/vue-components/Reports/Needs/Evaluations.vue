<template>
	<section>
		<h2>Needs evaluations</h2>

		<section>
			<component-list :items="trainees" :fields="traineeFields">
				<template scope="item">
					<evaluation-list-item :user="item" />
				</template>
			</component-list>
		</section>
		
		<email-editor :possibleRecipients="groupUsers(trainees)"
			:defaultBodyMarkdown="defaultEmailMarkdown"
			:emailReplacements="emailReplacements" />
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
			type: Object
		},
		evalThreshold: {
			type: Number
		},
		trainees: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			usersToNotify: []
		};
	},
	computed: {
		traineeFields(){
			return [
				'full_name',
				'type',
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
				'[[Name]]',
				'[[# Completed]]',
				'[[# Needed]]'
			];
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
	.evaluation-list-item:nth-child(even) {
		
	}
</style>
