<template>
	<section class="beyond-milestones" v-if="hasScenario">
		<h2>Beyond Milestones</h2>

		<beyond-milestones-scenario v-if="form" ref="scenarios"
			v-for="scenario of form.scenarios" :key="scenario.id"
			v-bind="scenario"
			:evaluationId="evaluation.id"
			:readonly="isReadonly"
		/>

		<beyond-milestones-professionalism-question ref="professionalismQuestions"
			v-for="question of randomProfessionalismQuestions" :key="question.id"
			v-bind="question"
			:evaluationId="evaluation.id"
			:readonly="isReadonly"
		/>

		<beyond-milestones-additional-question ref="additionalQuestions"
			v-for="question of additionalQuestions" :key="question.id"
			v-bind="question"
			:evaluationId="evaluation.id"
			:readonly="isReadonly"
		/>

		<bootstrap-alert v-if="showIncomplete" dismissable
			@close="showIncomplete = false"
		>
			<p>
				Please select a response for each question.
			</p>
		</bootstrap-alert>
	</section>
</template>

<style scoped>
	.beyond-milestones {

	}

	.beyond-milestones :global(.beyond-milestones-question) {
		border: 1px solid #ddd;
		border-radius: 3px;
	}

	.beyond-milestones :global(.beyond-milestones-question + .beyond-milestones-question) {
		margin-top: 2em;
	}
</style>

<script>
import gql from 'graphql-tag';

const NUM_PROFESSIONALISM_QUESTIONS = 2;

export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
		evaluation: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			form: [],
			randomProfessionalismQuestions: [],
			additionalQuestions: [],

			showIncomplete: false
		};
	},
	apollo: {
		form: {
			query: gql`
				query BeyondMilestonesFormScenarios($form_id: ID!) {
					form(id: $form_id) {
						id
						scenarios {
							id
							intro
							text
							options {
								text
								value
							}
						}
					}
				}
			`,
			variables() {
				return {
					form_id: this.evaluation.form_id
				};
			}
		},
		randomProfessionalismQuestions: {
			query: gql`
				query BeyondMilestonesRandomProfessionalismQuestions($id: ID!, $count: Int!) {
					randomProfessionalismQuestions(id: $id, count: $count) {
						id
						title
						intro
						text
						options {
							text
							value
						}
					}
				}
			`,
			variables() {
				return {
					id: this.evaluation.id,
					count: NUM_PROFESSIONALISM_QUESTIONS
				};
			}
		},
		additionalQuestions: {
			query: gql`
				query BeyondMilestonesAdditionalQuestions {
					additionalQuestions {
						id
						title
						intro
						text
						options {
							text
							value
						}
					}
				}
			`
		}
	},
	computed: {
		isReadonly() {
			return (
				this.evaluation.status !== 'pending'
				|| this.evaluation.evaluator_id !== this.user.id
			);
		},
		hasScenario() {
			return this.form && this.form.scenarios && this.form.scenarios.length > 0;
		}
	},
	methods: {
		checkComplete(highlight = true) {
			if (!this.hasScenario)
				return true;

			const questions = [
				...(this.$refs.scenarios || []),
				...(this.$refs.professionalismQuestions || []),
				...(this.$refs.additionalQuestions || [])
			];

			for (const question of questions) {
				if (question.value == null) {
					this.showIncomplete = true;
					if (highlight) {
						question.highlight();
					}

					return false;
				}
			}

			return true;
		}
	},
	components: {
		BootstrapAlert: () => import('#/BootstrapAlert.vue'),
		BeyondMilestonesScenario: () => import('./Scenario.vue'),
		BeyondMilestonesProfessionalismQuestion: () => import('./ProfessionalismQuestion.vue'),
		BeyondMilestonesAdditionalQuestion: () => import('./AdditionalQuestion.vue')
	}
};
</script>
