<template>
	<div class="container body-block manage-scenario">
		<h2>Scenario</h2>


		<form class="form" @submit="handleSubmit" v-if="scenario">
			<div class="form-group">
				<label class="containing-label">
					Title
					<input type="text" name="title" class="form-control" :value="scenario.title" />
				</label>
			</div>


			<div class="form-group">
				<label class="containing-label">
					Intro
					<textarea type="text" name="intro" class="form-control" :value="scenario.intro"></textarea>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Text
					<textarea type="text" name="text" class="form-control" :value="scenario.text"></textarea>
				</label>
			</div>

			<options-input v-model="options" type="number" step="0.1" />

			<div class="form-group">
				<label class="containing-label">
					Scenario type
					<select class="form-control" name="scenario_type" :value="scenario.scenario_type">
						<option v-for="option of scenarioTypeOptions" :value="option">
							{{ getOptionLabel(option) }}
						</option>
					</select>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Scenario difficulty
					<select class="form-control" name="scenario_difficulty" :value="scenario.scenario_difficulty">
						<option v-for="option of scenarioDifficultyOptions" :value="option">
							{{ getOptionLabel(option) }}
						</option>
					</select>
				</label>
			</div>


			<div class="btn-lg-submit-container">
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

import { ucfirst } from '@/modules/utils.js';

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

export default {
	props: {
		id: {
			type: [String],
			required: true
		}
	},
	data() {
		return {
			scenario: null,
			scenarioTypeOptions: [
				'GENERAL',
				'CARDIO',
				'OB',
				'NEURO',
				'TRAUMA'
			],
			scenarioDifficultyOptions: [
				'BEGINNER',
				'ADVANCED'
			],

			options: []
		};
	},
	apollo: {
		scenario: {
			query: SCENARIO_QUERY,
			variables() {
				return {
					id: this.id
				};
			}
		}
	},
	watch: {
		scenario(scenario) {
			this.options = scenario.options.map(({ __typename, ...o }) => o);
		}
	},
	methods: {
		getOptionLabel(option) {
			return ucfirst(option.toLowerCase());
		},
		handleSubmit(event) {
			event.preventDefault();

			const formData = new FormData(event.target);

			this.$apollo.mutate({
				mutation: gql`
					mutation ManageScenarioMutation(
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
				`,
				variables: {
					id: this.id,
					scenario_type: formData.get('scenario_type'),
					scenario_difficulty: formData.get('scenario_difficulty'),
					title: formData.get('title'),
					intro: formData.get('intro'),
					text: formData.get('text'),
					options: this.options
				}
			}).then(() => {
				this.$router.push('/scenarios');
			});
		}
	},
	components: {
		OptionsInput: () => import('./OptionsInput.vue')
	}
};
</script>
