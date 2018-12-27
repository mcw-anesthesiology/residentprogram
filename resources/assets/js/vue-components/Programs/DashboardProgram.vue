<template>
	<div class="program">
		<h2>{{ program.name }}</h2>

		<div v-if="evaluationsWithComments && evaluationsWithComments.length > 0"
				class="panel panel-default comment-evaluations-container">
			<div class="panel-heading">
				<h3 class="panel-title">Evaluations with comments</h3>
				<div class="text-right" v-if="showCommentEvaluations">
					<show-hide-button v-model="showCommentEvaluations" class="btn btn-info btn-xs">
						list
					</show-hide-button>
				</div>
			</div>
			<div v-if="showCommentEvaluations" class="panel-body">
				<evaluation-list :evaluations="evaluationsWithComments"></evaluation-list>
			</div>
			<div class="panel-footer text-center">
				<show-hide-button v-model="showCommentEvaluations" class="btn btn-info">
					list
				</show-hide-button>
			</div>
		</div>

		<evaluation-list :evaluations="program.evaluations"></evaluation-list>
	</div>
</template>

<style scoped>
.comment-evaluations-container {
	margin: 2em;
}
</style>

<script>
import EvaluationList from '@/vue-components/EvaluationList.vue';
import StartEndDate from '@/vue-components/StartEndDate.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

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
	data() {
		return {
			showCommentEvaluations: false
		};
	},
	mounted() {
		this.fetchEvaluations();
	},
	computed: {
		evaluationsWithComments() {
			if (!this.program || !this.program.evaluations)
				return [];

			return this.program.evaluations.filter(e => e.comment);
		}
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
		StartEndDate,
		ShowHideButton
	}
};
</script>
