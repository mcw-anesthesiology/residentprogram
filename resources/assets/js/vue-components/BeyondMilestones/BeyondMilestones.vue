<template>
	<div class="beyond-milestones">
		<beyond-milestones-scenario v-for="{scenario} of formScenarios" :key="scenario.id"
			v-bind="scenario"
			:evaluationId="evaluation.id"
		/>

		<beyond-milestones-professionalism-question v-for="pq of randomProfessionalismQuestions" :key="pq.id"
			v-bind="pq"
			:evaluationId="evaluation.id"
		/>
	</div>
</template>

<script>
import gql from 'graphql-tag';

const NUM_PROFESSIONALISM_QUESTIONS = 2;

export default {
	props: {
		evaluation: Object
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
				query BeyondMilestonesRandomProfessionalismQuestions($count: Int!) {
					randomProfessionalismQuestions(count: $count) {
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
			variables: {
				count: NUM_PROFESSIONALISM_QUESTIONS
			}
		}
	},
	components: {
		BeyondMilestonesScenario: () => import('./Scenario.vue'),
		BeyondMilestonesProfessionalismQuestion: () => import('./ProfessionalismQuestion.vue')
	}
};
</script>
