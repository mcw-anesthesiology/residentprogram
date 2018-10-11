<template>
	<div class="dashboard" :class="`${user ? user.type : ''}`">
		<div v-if="subjectEvaluations" class="container body-block subject-evaluations-block">
			<h2>
				Evaluations of me
				<small>
					<RichDateRange :dates="dates" />
				</small>
				<button type="button" class="btn btn-sm btn-default" @click="$store.dispatch('evaluations/subject/fetch', dates)">
					<span class="glyphicon glyphicon-refresh"></span>
				</button>
			</h2>
			<subject-evaluations-block :evaluations="subjectEvaluations"></subject-evaluations-block>
		</div>

		<div v-if="evaluatorEvaluations" class="container body-block evaluator-evaluations-block">
			<h2>
				Evaluations by me
				<small>
					<RichDateRange :dates="dates" />
				</small>
				<button type="button" class="btn btn-sm btn-default" @click="$store.dispatch('evaluations/evaluator/fetch', dates)">
					<span class="glyphicon glyphicon-refresh"></span>
				</button>
			</h2>
			<evaluator-evaluations-block :evaluations="evaluatorEvaluations"></evaluator-evaluations-block>
		</div>
	</div>
</template>

<style scoped>
	.dashboard {
		display: flex;
		flex-direction: column;
	}

	.dashboard.faculty .evaluator-evaluations-block {
		order: 1;
	}

	.dashboard.faculty .subject-evaluations-block {
		order: 2;
	}

	h2 button {
		float: right;
	}
</style>

<script>
import { mapState } from 'vuex';

import SubjectEvaluationsBlock from './SubjectEvaluationsBlock.vue';
import EvaluatorEvaluationsBlock from './EvaluatorEvaluationsBlock.vue';
import RichDateRange from '#/RichDateRange.vue';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapState(['user']),
		subjectEvaluations() {
			return this.$store.getters['evaluations/subject/listBetween'](this.dates);
		},
		evaluatorEvaluations() {
			return this.$store.getters['evaluations/evaluator/listBetween'](this.dates);
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
			this.$store.dispatch('evaluations/subject/fetch', this.dates);
			this.$store.dispatch('evaluations/evaluator/fetch', this.dates);
		}
	},
	components: {
		SubjectEvaluationsBlock,
		EvaluatorEvaluationsBlock,
		RichDateRange
	}
};
</script>
