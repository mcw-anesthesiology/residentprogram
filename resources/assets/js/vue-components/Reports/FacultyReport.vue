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

			<alert-list v-model="alerts" />
		</div>

		<stats-report v-if="evaluatorStats"
			:report="evaluatorStats" title="Trainee evaluation statistics by faculty" />
		<stats-report v-if="subjectStats"
			:report="subjectStats" title="Faculty evaluation statistics by faculty" />
	</div>
</template>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import StatsReport from './StatsReport.vue';
import StartEndDate from '../StartEndDate.vue';

import { handleError } from '@/modules/errors.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';
import { isoDateStringObject, currentQuarter } from '@/modules/date-utils.js';

export default {
	mixins: [HasAlerts],
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			evaluatorStats: null,
			subjectStats: null
		};
	},

	methods: {
		runReport(){
			fetch('/report/stats/trainee/faculty', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(this.dates)
			}).then(jsonOrThrow).then(stats => {
				this.evaluatorStats = stats;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching the evaluator statistics');
			});

			fetch('/report/stats/faculty/faculty', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(this.dates)
			}).then(jsonOrThrow).then(stats => {
				this.subjectStats = stats;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching the subject statistics');
			});
		}
	},

	components: {
		StatsReport,
		StartEndDate
	}
};
</script>
