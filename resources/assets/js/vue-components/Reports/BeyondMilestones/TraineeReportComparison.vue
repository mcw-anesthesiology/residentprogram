<template>
	<div>
		<individual-report v-if="report && user"
			:report="report"
			:subjectId="user.id"
			:subject="user"
		/>
	</div>
</template>

<script>

import IndividualReport from '#/Reports/IndividualReport.vue';

import { mapState } from 'vuex';

import { emitError } from '@/modules/errors.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			report: null
		};
	},
	mounted() {
		this.fetchReport();
	},
	computed: {
		...mapState(['user'])
	},
	methods: {
		fetchReport() {
			fetch('/report/trainee', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					...this.dates,
					trainingLevel: 'all',
					currentTrainingLevel: 'all'
				})
			}).then(jsonOrThrow).then(report => {
				this.report = report;
			}).catch(err => {
				emitError
			});
		}
	},
	components: {
		IndividualReport
	}
};
</script>
