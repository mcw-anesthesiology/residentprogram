<template>
	<section class="evaluator-evaluations-block">
		<evaluation-type-container :evaluations="newRequests" label="New" />
		<evaluation-type-container :evaluations="requests" label="Requests" />
		<evaluation-type-container :evaluations="inProgressEvaluations" label="In progress" />
		<evaluation-type-container :evaluations="completeEvaluations" label="Complete" :show="false" />
	</section>
</template>

<style scoped>
@supports (display: grid) {
	.evaluator-evaluations-block {
		display: grid;
		grid-template-rows: 1fr;
		grid-gap: 1px;
	}
}

.evaluator-evaluations-block {
	background: #ccc;
	border: 1px solid #ccc;
	border-radius: 3px;
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
			return this.evaluations.filter(e => !e.seen_by_evaluator && e.status === 'pending');
		},
		requests() {
			return this.evaluations.filter(e => e.seen_by_evaluator && e.status === 'pending');
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
