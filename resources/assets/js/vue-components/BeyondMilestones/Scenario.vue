<template>
	<div class="scenario">
		<div v-if="intro" class="intro">{{ intro }}</div>
		<div class="text">{{ text }}</div>

		<scenario-option v-for="(option, index) of options" :key="index"
			v-bind="option"
			:selected="isSelected(option)"
			:readonly="$apollo.loading || scenarioResponse !== null"
			@select="handleSelect(option)"
		/>
	</div>
</template>

<style scoped>

</style>

<script>
import gql from 'graphql-tag';

export default {
	props: {
		id: String,
		scenario_type: String,
		scenario_difficulty: String,
		intro: String,
		text: String,
		options: Array,
		evaluationId: Number
	},
	data() {
		return {
			scenarioResponse: null,
			selectedValue: null
		};
	},
	apollo: {
		scenarioResponse: {
			query: gql`
				query ScenarioResponse($scenario_id: ID!, $evaluation_id: ID!) {
					scenarioResponse(scenario_id: $scenario_id, evaluation_id: $evaluation_id) {
						id
						text
						value
					}
				}
			`,
			variables() {
				return {
					scenario_id: this.id,
					evaluation_id: this.evaluationId
				};
			}
		}
	},
	watch: {
		options() {
			this.selectedValue = null;
		}
	},
	methods: {
		handleSelect(option) {
			if (this.scenarioResponse)
				return;

			this.selectedValue = option.value;
		},
		isSelected(option) {
			return this.scenarioResponse
				? this.scenarioResponse.value === option.value
				: this.selectedValue === option.value;

		}
	},
	components: {
		ScenarioOption: () => import('./ScenarioOption.vue')
	}
};
</script>
