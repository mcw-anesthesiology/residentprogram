<template>
	<div class="container body-block">
		<h2>
			All evaluations
			<small>
				<RichDateRange :dates="dates" />
			</small>
		</h2>
		<evaluation-list :evaluations="evaluations" />
	</div>
</template>

<script>
import EvaluationList from '#/EvaluationList.vue';
import RichDateRange from '#/RichDateRange.vue';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	mounted() {
		this.fetchEvaluations();
	},
	computed: {
		evaluations() {
			return this.$store.getters['evaluations/listBetween'](this.dates);
		}
	},
	watch: {
		dates() {
			this.fetchEvaluations();
		}
	},
	methods: {
		fetchEvaluations() {
			this.$store.dispatch('evaluations/fetch', this.dates);
		}
	},
	components: {
		EvaluationList,
		RichDateRange
	}
};
</script>
