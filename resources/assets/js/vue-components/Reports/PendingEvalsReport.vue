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
					<template slot-scope="item">
						<evaluation-list-item :user="item"
							evals="evaluator_evaluations" />
					</template>
				</component-list>
			</section>
		</div>
	</div>
</template>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import EvaluationListItem from './Needs/EvaluationListItem.vue';
import StartEndDate from '../StartEndDate.vue';
import ComponentList from '../ComponentList.vue';

import { handleError } from '@/modules/errors.js';
import { getFetchHeaders } from '@/modules/utils.js';
import { isoDateStringObject, currentQuarter } from '@/modules/date-utils.js';

export default {
	mixins: [HasAlerts],
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			report: null
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
				handleError(err, this, 'There was a problem running the report');
			});
		}
	},
	components: {
		EvaluationListItem,
		StartEndDate,
		ComponentList
	}
};
</script>
