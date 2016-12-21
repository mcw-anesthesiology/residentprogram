<template>
	<section>
		<h2>Needs evaluations</h2>

		<section class="needs-container">
			<needs-evaluations-list :items="trainees" :fields="traineeFields" />
		</section>
	</section>
</template>

<script>
import NeedsEvaluationsList from './EvaluationList.vue';
import EvaluationListItem from './EvaluationListItem.vue';
import ComponentList from '../../ComponentList.vue';

// TODO: Remove whichever of these lists we don't use

export default {
	props: {
		trainees: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			usersToNotify: []
		};
	},
	computed: {
		traineeFields(){
			return [
				'full_name',
				'type',
				'training_level'
			];
		}
	},

	components: {
		NeedsEvaluationsList,
		EvaluationListItem,
		ComponentList
	}
};
</script>
