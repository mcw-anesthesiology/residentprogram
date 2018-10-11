<template>
	<section class="evaluator-evaluations-block">
		<evaluation-type-container :evaluations="newRequests" label="New" />
		<evaluation-type-container :evaluations="requests" label="Requests" />
		<evaluation-type-container :evaluations="inProgressEvaluations" label="In progress" />
		<evaluation-type-container :evaluations="completeEvaluations" label="Complete" :show="false" />
	</section>
</template>

<style scoped>
	.evaluator-evaluations-block {
		background: #ddd;
		border: 1px solid #ccc;
		border-radius: 3px;
	}

	@supports (display: grid) {
		.evaluator-evaluations-block {
			display: grid;
			grid-template-columns: 1fr;
			grid-gap: 2px;
		}
	}
</style>

<script>
import EvaluationTypeContainer from './EvaluationTypeContainer.vue';

export default {
	props: {
		evaluations: {
			type: Array,
			required: true
		}
	},
	computed: {
		newRequests() {
			return this.evaluations.filter(e => !e.seen_by_evaluator_at && e.status === 'pending');
		},
		requests() {
			return this.evaluations.filter(e => e.seen_by_evaluator_at && e.status === 'pending');
		},
		inProgressEvaluations() {
			return this.evaluations.filter(e => e.status === 'saved');
		},
		completeEvaluations() {
			return this.evaluations.filter(e => e.status === 'complete');
		}
	},
	components: {
		EvaluationTypeContainer
	}
};
</script>
