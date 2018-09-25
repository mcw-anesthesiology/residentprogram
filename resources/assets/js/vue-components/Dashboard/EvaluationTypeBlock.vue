<template>
	<section>
		<h3>Pending</h3>
		<evaluation-list :evaluations="pendingEvaluations"></evaluation-list>

		<h3>Complete</h3>
		<evaluation-list :evaluations="completeEvaluations"></evaluation-list>
	</section>
</template>

<script>
import EvaluationList from '@/vue-components/EvaluationList.vue';

export default {
	props: {
		evaluations: {
			type: Array,
			required: true
		}
	},
	computed: {
		pendingEvaluations() {
			return this.evaluations.filter(e => e.status === 'pending');
		},
		completeEvaluations() {
			return this.evaluations.filter(e => e.status === 'complete');
		}
	},
	components: {
		EvaluationList
	}
};
</script>
