<template>
	<section v-if="shouldShow" class="beyond-milestones-question scenario">
		<header>
			<h3 v-if="title">{{ title }}</h3>

			<div v-if="intro" class="intro">
				<markdown-renderer :md="intro" :replacements="markdownReplacements" />
			</div>

			<div class="text">
				<markdown-renderer :md="text" :replacements="markdownReplacements" />
			</div>

			<span class="saved-label">
				<timeout-label v-model="saved" />
			</span>
		</header>

		<beyond-milestones-options
			:options="options"
			:value="value"
			:name="name"
			:readonly="readonly"
			:highlighted="highlighted"
			:evaluation="evaluation"
			@change="handleSelect"
			show-value
		/>
	</section>
</template>

<style scoped>
	.scenario {
		font-size: 1.15em;
		font-family: 'Roboto', sans-serif;
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
import 'typeface-roboto';
import Highlightable from '@/vue-mixins/Highlightable.js';

const SCENARIO_RESPONSE_QUERY = gql`
	query ScenarioResponse($scenario_id: ID!, $evaluation_id: ID!) {
		scenarioResponse(scenario_id: $scenario_id, evaluation_id: $evaluation_id) {
			id
			value
		}
	}
`;

export default {
	mixins: [Highlightable],
	props: {
		id: String,
		scenario_type: String,
		scenario_difficulty: String,
		title: String,
		intro: String,
		text: String,
		options: Array,

		evaluationId: {
			type: Number,
			required: false
		},
		evaluation: Object,
		readonly: {
			type: Boolean,
			default: false
		}
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
			},
			skip() {
				return !this.evaluationId
			}
		}
	},
	computed: {
		shouldShow() {
			if (this.readonly && this.evaluation && this.evaluation.status === 'complete' && !this.scenarioResponse) {
				return false;
			}

			return true;
		},
		name() {
			return `scenario:${this.id}`;
		},
		value() {
			return this.scenarioResponse ? this.scenarioResponse.value : null;
		},
		markdownReplacements() {
			const replacements = new Map();

			if (this.evaluation && this.evaluation.subject) {
				const subject = this.evaluation.subject;
				replacements.set(/(this|the) (resident|trainee)/ig, `${subject.first_name} ${subject.last_name}`);
			}

			return replacements;
		}
	},
	methods: {
		handleSelect(option) {
			if (this.readonly)
				return;

			const scenario_id = this.id;
			const evaluation_id = this.evaluationId;

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
					scenario_id,
					evaluation_id,
					value: option.value
				},
				update(store, { data: { setScenarioResponse } }) {
					store.writeQuery({
						query: SCENARIO_RESPONSE_QUERY,
						data: {
							scenarioResponse: setScenarioResponse
						},
						variables: {
							scenario_id,
							evaluation_id
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
		TimeoutLabel: () => import('#/TimeoutLabel.vue'),
		MarkdownRenderer: () => import('#/MarkdownRenderer.vue')
	}
};
</script>
