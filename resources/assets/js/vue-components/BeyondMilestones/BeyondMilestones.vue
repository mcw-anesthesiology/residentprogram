<template>
	<section class="beyond-milestones">
		<h2>Beyond Milestones</h2>

		<beyond-milestones-scenario v-if="form"
			v-for="scenario of form.scenarios" :key="scenario.id"
			v-bind="scenario"
			:evaluationId="evaluation.id"
			:readonly="isReadonly"
		/>

		<beyond-milestones-professionalism-question v-for="pq of randomProfessionalismQuestions" :key="pq.id"
			v-bind="pq"
			:evaluationId="evaluation.id"
			:readonly="isReadonly"
		/>
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
		}
	},
	computed: {
		isReadonly() {
			return (
				this.evaluation.status !== 'pending'
				|| this.evaluation.evaluator_id !== this.user.id
			);
		}
	},
	components: {
		BeyondMilestonesScenario: () => import('./Scenario.vue'),
		BeyondMilestonesProfessionalismQuestion: () => import('./ProfessionalismQuestion.vue')
	}
};
</script>
