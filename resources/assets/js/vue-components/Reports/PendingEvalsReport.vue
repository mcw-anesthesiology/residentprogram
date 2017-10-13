<template>
	<div>
		<div class="container body-block">
			<h1>Pending evaluation requests</h1>
			<start-end-date v-model="dates" />
			
			<alert-list v-model="alerts" />
			
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary labelless-button"
						@click="runReport">
					Run report
				</button>
			</div>
		</div>
		
		
		<div v-if="report" class="container body-block">
			<section>
				<component-list :items="report" :fields="userFields">
					<template scope="item">
						<evaluation-list-item :user="item"
							evals="evaluator_evaluations" />
					</template>
				</component-list>
			</section>
		</div>
	</div>
</template>

<script>
import EvaluationListItem from './Needs/EvaluationListItem.vue';
import StartEndDate from '../StartEndDate.vue';
import AlertList from '../AlertList.vue';
import ComponentList from '../ComponentList.vue';

import { getFetchHeaders } from '@/modules/utils.js';
import { isoDateStringObject, currentQuarter } from '@/modules/date-utils.js';

export default {
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			report: null,
			
			alerts: []
		};
	},
	computed: {
		userFields(){
			return [
				'full_name'
			];
		}
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
		EvaluationListItem,
		StartEndDate,
		AlertList,
		ComponentList
	}
};
</script>
