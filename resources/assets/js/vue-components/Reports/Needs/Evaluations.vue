<template>
	<section>
		<h2>Needs evaluations</h2>

		<section>
			<component-list :items="trainees" :fields="traineeFields">
				<template scope="item">
					<evaluation-list-item :user="item" />
				</template>
			</component-list>
		</section>
	</section>
</template>

<script>
import EvaluationListItem from './EvaluationListItem.vue';
import ComponentList from '../../ComponentList.vue';

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
		EvaluationListItem,
		ComponentList
	}
};
</script>

<style scoped>
	.evaluation-list-item:nth-child(even) {
		
	}
</style>
