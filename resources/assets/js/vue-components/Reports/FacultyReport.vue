<template>
	<div>
		<div class="container body-block">
			<h1>Faculty report</h1>
			<start-end-date v-model="dates" />
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
						@click="runReport">
					Run report
				</button>
			</div>
		</div>
		
		<stats-report v-if="stats" :report="stats" />
	</div>
</template>

<script>
import StatsReport from './StatsReport.vue';
import StartEndDate from '../StartEndDate.vue';
import AlertList from '../AlertList.vue';

import { getFetchHeaders, jsonOrThrow } from '../../modules/utils.js';
import { isoDateStringObject, currentQuarter } from '../../modules/date-utils.js';

export default {
	props: {
		users: {
			type: Array,
			required: true
		},
		groupedUsers: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			stats: null,
			show: {
				inactiveUsers: false
			}
		};
	},
	
	computed: {
		filteredUsers(){
			let userTypes = ['faculty'];
			if(this.show.inactiveUsers)
				userTypes.push('inactive');
			
			return this.groupedUsers.filter(userGroup =>
				userTypes.includes(userGroup.text.toLowerCase()));
		}
	},
	
	methods: {
		runReport(){
			fetch('/report/stats/trainee/faculty', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(this.dates)
			}).then(jsonOrThrow).then(stats => {
				this.stats = stats;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: `<strong>Error: </strong> There was a problem fetching the report`
				});
			});
		}
	},
	
	components: {
		StatsReport,
		StartEndDate,
		AlertList
	}
};
</script>
