<template>
	<div class="container body-block">
		<h2>
			All evaluations
			<small>
				<RichDateRange :dates="dates" />
			</small>
		</h2>

		<div class="text-right">
			<reload-button @click="fetchEvaluations" />
		</div>

		<loading-placeholder v-if="loading" />
		<evaluation-list v-else :evaluations="evaluations" />
	</div>
</template>

<script>
import EvaluationList from '#/EvaluationList.vue';
import RichDateRange from '#/RichDateRange.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import ReloadButton from '#/ReloadButton.vue';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false
		};
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
			this.loading = true;
			this.$store.dispatch('evaluations/fetch', this.dates).then(() => {
				this.loading = false;
			});
		}
	},
	components: {
		ReloadButton,
		EvaluationList,
		RichDateRange,
		LoadingPlaceholder
	}
};
</script>
