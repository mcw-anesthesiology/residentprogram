<template>
	<section v-if="shouldShow" class="beyond-milestones-question professionalism-question">
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
			@change="handleSelect"
		/>
	</section>
</template>

<style scoped>
	.professionalism-question {
		font-size: 1.25em;
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
import Highlightable from '@/vue-mixins/Highlightable.js';

const PROFESSIONALISM_RESPONSE_QUERY = gql`
	query ProfessionalismQuestionResponse($question_id: ID!, $evaluation_id: ID!) {
		professionalismResponse(question_id: $question_id, evaluation_id: $evaluation_id) {
			id
			value
		}
	}
`;

export default {
	mixins: [Highlightable],
	props: {
		id: String,
		title: String,
		intro: String,
		text: String,
		options: Array,

		evaluationId: Number,
		evaluation: Object,
		readonly: Boolean
	},
	data() {
		return {
			professionalismResponse: null,
			saved: false
		};
	},
	apollo: {
		professionalismResponse: {
			query: PROFESSIONALISM_RESPONSE_QUERY,
			variables() {
				return {
					question_id: this.id,
					evaluation_id: this.evaluationId
				};
			}
		}
	},
	computed: {
		shouldShow() {
			if (this.readonly && this.evaluation.status === 'complete' && !this.professionalismResponse) {
				return false;
			}

			return true;
		},
		name() {
			return `professionalism-question:${this.id}`;
		},
		value() {
			return this.professionalismResponse
				? this.professionalismResponse.value
				: null;
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
			const question_id = this.id;
			const evaluation_id = this.evaluationId;

			this.$apollo.mutate({
				mutation: gql`
						mutation SetProfessionalismResponse($question_id: ID!, $evaluation_id: ID!, $value: Boolean!) {
							setProfessionalismResponse(question_id: $question_id, evaluation_id: $evaluation_id, value: $value) {
								id
								value
							}
						}
					`,
				variables: {
					question_id,
					evaluation_id,
					value: option.value
				},
				update(store, { data: { setProfessionalismResponse } }) {
					store.writeQuery({
						query: PROFESSIONALISM_RESPONSE_QUERY,
						data: {
							professionalismResponse: setProfessionalismResponse
						},
						variables: {
							question_id,
							evaluation_id
						}
					});
				}
			}).then(() => {
				this.saved = true;
			});
		}
	},
	components: {
		BeyondMilestonesOptions: () => import('./Options.vue'),
		TimeoutLabel: () => import('#/TimeoutLabel.vue'),
		MarkdownRenderer: () => import('#/MarkdownRenderer.vue')
	}
};
</script>
