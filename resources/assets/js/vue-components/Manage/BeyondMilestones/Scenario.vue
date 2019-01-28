<template>
	<div class="container body-block manage-scenario">
		<h2>Scenario</h2>

		<p v-if="$apollo.loading">Loading...</p>
		<form v-else class="form" @submit="handleSubmit">
			<div class="form-group">
				<label class="containing-label">
					Title
					<input type="text" name="title" class="form-control" v-model="scenario.title" />
				</label>
			</div>


			<div class="form-group">
				<label class="containing-label">
					Intro
					<textarea type="text" name="intro" class="form-control" v-model="scenario.intro"></textarea>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Text
					<textarea type="text" name="text" class="form-control" v-model="scenario.text"></textarea>
				</label>
			</div>

			<options-input v-model="scenario.options" type="number" step="0.1" />

			<div class="form-group">
				<label class="containing-label">
					Scenario type
					<select class="form-control" name="scenario_type" v-model="scenario.scenario_type">
						<option v-for="option of scenarioTypeOptions" :value="option">
							{{ getOptionLabel(option) }}
						</option>
					</select>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Scenario difficulty
					<select class="form-control" name="scenario_difficulty" v-model="scenario.scenario_difficulty">
						<option v-for="option of scenarioDifficultyOptions" :value="option">
							{{ getOptionLabel(option) }}
						</option>
					</select>
				</label>
			</div>


			<div class="btn-lg-submit-container">
				<confirmation-button v-if="id !== 'new'" class="btn btn-danger" @click="handleDelete">
					Delete
				</confirmation-button>
				<router-link class="btn btn-default" to="/scenarios">
					Cancel
				</router-link>

				<button type="submit" class="btn btn-primary">
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import { SCENARIOS_QUERY } from '@/graphql/beyond-milestones/scenario.js';

import { ucfirst } from '@/modules/utils.js';
import { stripTypename } from '@/modules/graphql-utils.js';

const SCENARIO_FIELDS = gql`
	fragment ManageScenarioFields on Scenario {
		id
		scenario_type
		scenario_difficulty
		title
		intro
		text
		options {
			text
			value
		}
	}
`;

const SCENARIO_QUERY = gql`
	query ManageScenarioQuery($id: ID!) {
		scenario(id: $id) {
			...ManageScenarioFields
		}
	}
	${SCENARIO_FIELDS}
`;

const UPDATE_SCENARIO_MUTATION = gql`
	mutation UpdateScenarioMutation(
		$id: ID!
		$scenario_type: ScenarioType
		$scenario_difficulty: ScenarioDifficulty
		$title: String
		$intro: String
		$text: String
		$options: [ScenarioOptionInput!]
	) {
		updateScenario(
			id: $id
			scenario_type: $scenario_type
			scenario_difficulty: $scenario_difficulty
			title: $title
			intro: $intro
			text: $text
			options: $options
		) {
			...ManageScenarioFields
		}
	}
	${SCENARIO_FIELDS}
`;

const CREATE_SCENARIO_MUTATION = gql`
	mutation CreateScenarioMutation(
		$scenario_type: ScenarioType
		$scenario_difficulty: ScenarioDifficulty
		$title: String
		$intro: String
		$text: String
		$options: [ScenarioOptionInput!]
	) {
		createScenario(
			scenario_type: $scenario_type
			scenario_difficulty: $scenario_difficulty
			title: $title
			intro: $intro
			text: $text
			options: $options
		) {
			...ManageScenarioFields
		}
	}
	${SCENARIO_FIELDS}
`;

const scenarioTypeOptions = [
	'GENERAL',
	'CARDIO',
	'OB',
	'NEURO',
	'TRAUMA'
];

const scenarioDifficultyOptions = [
	'BEGINNER',
	'ADVANCED'
];

export default {
	props: {
		id: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			scenario: {
				scenario_type: scenarioTypeOptions[0],
				scenario_difficulty: scenarioDifficultyOptions[0],
				title: '',
				intro: '',
				text: '',
				options: []
			},
			scenarioTypeOptions,
			scenarioDifficultyOptions
		};
	},
	apollo: {
		scenario: {
			query: SCENARIO_QUERY,
			variables() {
				return {
					id: this.id
				};
			},
			skip() {
				return this.id === 'new';
			}
		}
	},
	methods: {
		getOptionLabel(option) {
			return ucfirst(option.toLowerCase());
		},
		handleSubmit(event) {
			event.preventDefault();

			// const formData = new FormData(event.target);

			const mutation = this.id === 'new'
				? CREATE_SCENARIO_MUTATION
				: UPDATE_SCENARIO_MUTATION;

			const variables = stripTypename({
				...this.scenario,
				options: this.scenario.options.map(stripTypename)
			});

			let update;

			if (this.id === 'new') {
				update = (store, { data: { createScenario } }) => {
					const query = SCENARIOS_QUERY;
					const data = store.readQuery({ query });
					data.scenarios.push(createScenario);
					store.writeQuery({ query, data });
				};
			}

			this.$apollo.mutate({
				mutation,
				variables,
				update
			}).then(() => {
				this.$router.push('/scenarios');
			});
		},
		handleDelete() {
			this.$apollo.mutate({
				mutation: gql`
					mutation DeleteScenario($id: ID!) {
						deleteScenario(id: $id) {
							...ManageScenarioFields
						}
					}
					${SCENARIO_FIELDS}
				`,
				variables: {
					id: this.id
				}
			}).then(() => {
				this.$router.push('/scenarios');
			});
		}
	},
	components: {
		ConfirmationButton: () => import('#/ConfirmationButton.vue'),
		OptionsInput: () => import('./OptionsInput.vue')
	}
};
</script>
