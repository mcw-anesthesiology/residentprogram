<template>
	<div class="container body-block">
		<h2>Scenarios</h2>

		<component-list :fields="scenarioFields" :items="scenarios">
			<template slot-scope="scenario">
				<scenario-list-item :scenario="scenario" />
			</template>
		</component-list>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import { SCENARIOS_FIELDS } from '@/graphql/beyond-milestones/scenario.js';

const SCENARIOS_QUERY = gql`
	query ManageScenariosQuery {
		scenarios {
			...ManageScenariosFields
		}
	}
	${SCENARIOS_FIELDS}
`;

export default {
	data() {
		return {
			scenarios: [],

			scenarioFields: [
				'scenario_type',
				'scenario_difficulty',
				'title'
			]
		};
	},
	apollo: {
		scenarios: {
			query: SCENARIOS_QUERY
		},
	},
	components: {
		ComponentList: () => import('#/ComponentList.vue'),
		ScenarioListItem: () => import('./ScenarioListItem.vue')
	}
};
</script>
