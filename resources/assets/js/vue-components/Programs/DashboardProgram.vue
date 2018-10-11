<template>
	<div class="program">
		<h2>{{ program.name }}</h2>

		<evaluation-list :evaluations="program.evaluations"></evaluation-list>
	</div>
</template>

<script>
import EvaluationList from '@/vue-components/EvaluationList.vue';
import StartEndDate from '@/vue-components/StartEndDate.vue';

export default {
	props: {
		program: {
			type: Object,
			required: true
		},
		dates: {
			type: Object,
			required: true
		}
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
