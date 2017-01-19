<template>
	<div>
		<div class="container body-block">
			<h2>Pending evaluation requests</h2>
			<report-date v-model="dates" />
			
			<alert-list v-model="alerts" />
			
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-primary labelless-button"
						@click="runReport">
					Run report
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import ReportDate from './ReportDate.vue';
import AlertList from '../AlertList.vue';

import { getFetchHeaders } from '../../modules/utils.js';

export default {
	data(){
		return {
			dates: {
				startDate: null,
				endDate: null
			},
			report: null,
			
			alerts: []
		};
	},
	methods: {
		runReport(){
			fetch('/report/pending-requests', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate
				})
			}).then(response => {
				if(response.ok)
					return response.json();
				
				throw new Error();
			}).then(report => {
				this.report = report;
			}).catch(err => {
				this.alerts.push({
					type: 'error',
					html: '<b>Error</b>: There was a problem running the report.'
				});
				console.error(err);
			});
		}
	},
	components: {
		ReportDate,
		AlertList
	}
};
</script>
