<template>
	<section class="beyond-milestones" v-if="hasScenario">
		<h2>Beyond Milestones</h2>

		<template v-if="form">
			<beyond-milestones-scenario ref="scenarios"
				v-for="scenario of form.scenarios" :key="scenario.id"
				v-bind="scenario"
				:evaluationId="evaluation.id"
				:evaluation="evaluation"
				:readonly="isReadonly"
			/>
		</template>

		<beyond-milestones-professionalism-question ref="professionalismQuestions"
			v-for="question of randomProfessionalismQuestions" :key="question.id"
			v-bind="question"
			:evaluationId="evaluation.id"
			:evaluation="evaluation"
			:readonly="isReadonly"
		/>

		<beyond-milestones-additional-question ref="additionalQuestions"
			v-for="question of additionalQuestions" :key="question.id"
			v-bind="question"
			:evaluationId="evaluation.id"
			:evaluation="evaluation"
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
	h2:only-child {
		display: none;
	}

	.beyond-milestones >>> .beyond-milestones-question {
		border: 1px solid #ddd;
		border-radius: 3px;
	}

	.beyond-milestones >>> .beyond-milestones-question + .beyond-milestones-question {
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
				query BeyondMilestones(
					$form_id: ID!
					$evaluation_id: ID!
					$pqCount: Int!
				) {
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
					randomProfessionalismQuestions(
						id: $evaluation_id
						count: $pqCount
					) {
						id
						title
						intro
						text
						options {
							text
							value
						}
					}
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
			`,
			manual: true,
			result({ data }) {
				if (data) {
					for (const [query, result] of Object.entries(data)) {
						this[query] = result;
					}
				}
			},
			variables() {
				return {
					form_id: this.evaluation.form_id,
					evaluation_id: this.evaluation.id,
					pqCount: NUM_PROFESSIONALISM_QUESTIONS
				};
			},
			skip() {
				return !this.user || this.user.type === 'external';
			}
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
