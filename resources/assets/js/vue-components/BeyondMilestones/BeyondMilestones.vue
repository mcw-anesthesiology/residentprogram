<template>
	<section class="beyond-milestones">
		<h2>Beyond Milestones</h2>

		<beyond-milestones-scenario v-for="{scenario} of formScenarios" :key="scenario.id"
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
		border: 1px solid #aaa;
		border-radius: 3px;
		padding: 1em;
	}

	.beyond-milestones :global(.beyond-milestones-question) {
		border: 1px solid blue;
		border-radius: 5px;
		padding: 1em;
		margin-bottom: 1em;
	}

	.beyond-milestones :global(.beyond-milestones-question:last-child) {
		margin-bottom: 0;
	}

	h2 {
		margin-top: 0;
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
			formScenarios: [],
			randomProfessionalismQuestions: [],
		};
	},
	apollo: {
		formScenarios: {
			query: gql`
				query BeyondMilestonesScenarios($form_id: ID) {
					formScenarios(form_id: $form_id) {
						id
						scenario {
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
