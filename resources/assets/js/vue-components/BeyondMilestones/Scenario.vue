<template>
	<div class="beyond-milestones-question scenario">
		<h3 v-if="title">{{ title }}</h3>

		<div v-if="intro" class="intro">{{ intro }}</div>
		<div class="text">{{ text }}</div>

		<fieldset>
			<scenario-option v-for="(option, index) of options" :key="index"
				v-bind="option"
				:id="id"
				:selected="isSelected(option)"
				:readonly="readonly"
				@select="handleSelect(option)"
			/>
		</fieldset>
	</div>
</template>

<style scoped>
	h3 {
		margin-top: 0;
	}

	.intro,
	.text {
		margin: 0.5em;
	}

	fieldset {
		display: flex;
		flex-wrap: wrap;
	}
</style>

<script>
import gql from 'graphql-tag';

const SCENARIO_RESPONSE_QUERY = gql`
	query ScenarioResponse($scenario_id: ID!, $evaluation_id: ID!) {
		scenarioResponse(scenario_id: $scenario_id, evaluation_id: $evaluation_id) {
			id
			value
		}
	}
`;

export default {
	props: {
		id: String,
		scenario_type: String,
		scenario_difficulty: String,
		title: String,
		intro: String,
		text: String,
		options: Array,

		evaluationId: Number,
		readonly: Boolean
	},
	data() {
		return {
			scenarioResponse: null
		};
	},
	apollo: {
		scenarioResponse: {
			query: SCENARIO_RESPONSE_QUERY,
			variables() {
				return {
					scenario_id: this.id,
					evaluation_id: this.evaluationId
				};
			}
		}
	},
	methods: {
		handleSelect(option) {
			if (this.readonly)
				return;

			this.$apollo.mutate({
				mutation: gql`
					mutation SetScenarioResponse($scenario_id: ID!, $evaluation_id: ID!, $value: Float!) {
						setScenarioResponse(scenario_id: $scenario_id, evaluation_id: $evaluation_id, value: $value) {
							id
							value
						}
					}
				`,
				variables: {
					scenario_id: this.id,
					evaluation_id: this.evaluationId,
					value: option.value
				},
				update(store, { data: { setScenarioResponse } }) {
					store.writeQuery({
						query: SCENARIO_RESPONSE_QUERY,
						data: {
							scenarioResponse: setScenarioResponse
						}
					});
				}
			});
		},
		isSelected(option) {
			return this.scenarioResponse && this.scenarioResponse.value === option.value;
		}
	},
	components: {
		ScenarioOption: () => import('./ScenarioOption.vue')
	}
};
</script>
