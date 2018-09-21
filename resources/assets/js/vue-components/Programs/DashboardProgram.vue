<template>
	<div class="program">
		<h2>{{ program.name }}</h2>

		<start-end-date v-model="dates" />

		<evaluation-list :evaluations="program.evaluations"></evaluation-list>
	</div>
</template>

<script>
import EvaluationList from '@/vue-components/EvaluationList.vue';
import StartEndDate from '@/vue-components/StartEndDate.vue';

import { isoDateStringObject, currentQuarter } from '@/modules/date-utils.js';

export default {
	props: {
		program: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dates: isoDateStringObject(currentQuarter())
		};
	},
	mounted() {
		this.fetchEvaluations();
	},
	watch: {
		dates() {
			this.fetchEvaluations();
		}
	},
	methods: {
		fetchEvaluations() {
			this.$store.dispatch('programs/fetchEvaluations', {
				id: this.program.id,
				start: this.dates.startDate,
				end: this.dates.endDate
			});
		}
	},
	components: {
		EvaluationList,
		StartEndDate
	}
};
</script>
