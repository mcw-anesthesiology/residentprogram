<template>
	<section class="beyond-milestones-question scenario">
		<header>
			<h3 v-if="title">{{ title }}</h3>

			<div v-if="intro" class="intro">{{ intro }}</div>
			<div class="text">{{ text }}</div>

			<span class="saved-label">
				<timeout-label v-model="saved" />
			</span>
		</header>

		<beyond-milestones-options
			:options="options"
			:value="scenarioResponse ? scenarioResponse.value : null"
			:name="name"
			:readonly="readonly"
			@change="handleSelect"
		/>
	</section>
</template>

<style scoped>
	.scenario {

	}

	header {
		position: relative;
		padding: 1.5em;
	}

	h3 {
		margin-top: 0;
	}

	.intro:not(:last-child),
	.text:not(:last-child) {
		margin-bottom: 1em;
	}

	.saved-label {
		position: absolute;
		right: 1em;
		bottom: 1em;
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
			scenarioResponse: null,
			saved: false
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
	computed: {
		name() {
			return `scenario:${this.id}`;
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
			}).then(() => {
				this.saved = true;
			});
		},
		isSelected(option) {
			return this.scenarioResponse && this.scenarioResponse.value === option.value;
		}
	},
	components: {
		BeyondMilestonesOptions: () => import('./Options.vue'),
		TimeoutLabel: () => import('#/TimeoutLabel.vue')
	}
};
</script>
