<template>
	<div>
		<beyond-milestones-scenario v-for="({scenario}, index) of formScenarios" :key="index"
			v-bind="scenario"
			:evaluationId="evaluation.id"
		/>
	</div>
</template>

<script>
import gql from 'graphql-tag';

export default {
	props: {
		evaluation: Object
	},
	data() {
		return {
			formScenarios: []
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
		}
	},
	components: {
		BeyondMilestonesScenario: () => import('./Scenario.vue')
	}
};
</script>
