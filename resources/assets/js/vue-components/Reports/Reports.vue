<template>
	<div>
		<div class="container body-block reports-selector">
			<fieldset>
				<legend>Report type</legend>
				<div class="form-inline">
					<router-link v-for="type of reportTypes" :key="type"
							:to="`/${type}`"
							class="report-type-option btn btn-default"
							active-class="disabled">
						{{ kebabCaseToWords(type) }}
					</router-link>
				</div>
			</fieldset>
		</div>

		<router-view :users="users" :groupedUsers="groupedUsers"></router-view>
	</div>
</template>

<script>
import {
	kebabCaseToWords,
	fetchUsers,
	groupUsers
} from 'modules/utils.js';

export default {
	data(){
		return {
			reportType: 'trainee',
			users: []
		};
	},
	computed: {
		reportTypes(){
			return [
				'trainee',
				'faculty',
				'form',
				'needs-evaluations',
				'pending-requests',
				'faculty-merit'
			];
		},
		groupedUsers(){
			return groupUsers(this.users);
		}
	},

	created(){
		fetchUsers().then(users => {
			this.users = users;
		}).catch(err => {
			console.error(err);
		});
	},

	methods: {
		kebabCaseToWords
	}
};
</script>

<style scoped>
	.report-type-option {
		margin: 0 1em;
	}

	@media print {
		.reports-selector {
			display: none;
		}
	}
</style>
