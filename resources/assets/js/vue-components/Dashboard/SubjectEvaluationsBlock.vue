<template>
	<section class="subject-evaluations-block">
		<evaluation-type-container :evaluations="newEvaluations" label="New" />
		<evaluation-type-container :evaluations="pendingEvaluations" label="Pending" />
		<evaluation-type-container :evaluations="completeEvaluations" label="Complete" :show="false" />
	</section>
</template>

<style scoped>
	.subject-evaluations-block {
		background: #ddd;
		border: 1px solid #ccc;
		border-radius: 3px;
	}

	@supports (display: grid) {
		.subject-evaluations-block {
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
		newEvaluations() {
			return this.evaluations.filter(e => e.status === 'complete' && !e.seen_by_subject_at);
		},
		pendingEvaluations() {
			return this.evaluations.filter(e => e.status === 'pending');
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
