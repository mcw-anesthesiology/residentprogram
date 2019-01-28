<template>
	<div class="container body-block">
		<h2>Scenarios</h2>

		<router-link to="new" append class="btn btn-success">
			<span class="glyphicon glyphicon-plus"></span>
			Add scenario
		</router-link>

		<component-list :fields="scenarioFields" :items="scenarios">
			<template slot-scope="scenario">
				<scenario-list-item :scenario="scenario" />
			</template>
		</component-list>
	</div>
</template>

<script>
import { SCENARIOS_QUERY } from '@/graphql/beyond-milestones/scenario.js';

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
