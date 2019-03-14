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

		<div v-if="loading.evaluatorStats" class="container body-block">
			<loading-placeholder />
		</div>
		<stats-report v-else-if="evaluatorStats"
			:report="evaluatorStats" title="Trainee evaluation statistics by faculty" />

		<div v-if="loading.subjectStats" class="container body-block">
			<loading-placeholder />
		</div>
		<stats-report v-else-if="subjectStats"
			:report="subjectStats" title="Faculty evaluation statistics by faculty" />
	</div>
</template>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import StatsReport from './StatsReport.vue';
import StartEndDate from '../StartEndDate.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';

import { handleError } from '@/modules/errors.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';
import { isoDateStringObject, currentQuarter } from '@/modules/date-utils.js';

export default {
	mixins: [HasAlerts],
	data(){
		return {
			dates: isoDateStringObject(currentQuarter()),
			evaluatorStats: null,
			subjectStats: null,
			loading: {
				subjectStats: false,
				evaluatorStats: false
			}
		};
	},

	methods: {
		runReport(){
			this.loading.subjectStats = true;
			this.loading.evaluatorStats = true;

			fetch('/report/stats/trainee/faculty', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(this.dates)
			}).then(jsonOrThrow).then(stats => {
				this.evaluatorStats = stats;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching the evaluator statistics');
			}).finally(() => {
				this.loading.evaluatorStats = false;
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
			}).finally(() => {
				this.loading.subjectStats = false;
			});
		}
	},

	components: {
		LoadingPlaceholder,
		StatsReport,
		StartEndDate
	}
};
</script>
