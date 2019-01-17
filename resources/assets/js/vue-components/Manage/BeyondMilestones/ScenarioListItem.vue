<template>
	<div class="scenario-list-item">
		<div class="scenario-id">
			<labeled-value label="#">
				<router-link :to="scenario.id" append>
					{{ scenario.id }}
				</router-link>
			</labeled-value>
		</div>

		<div class="scenario-title">
			<labeled-value label="Title">
				<span>{{ scenario.title }}</span>
			</labeled-value>
		</div>

		<div class="scenario-text">
			<labeled-value label="Text">
				<span>{{ scenario.text }}</span>
			</labeled-value>
		</div>

		<div class="scenario-forms">
			<labeled-value label="Forms">
				<ul>
					<li v-for="form of scenario.forms">
						{{ form.title }}
					</li>
				</ul>
				<button v-if="!show.forms" type="button" class="btn btn-info btn-xs" @click="show.forms = true">
					<span class="glyphicon glyphicon-plus"></span>
					Add forms
				</button>
			</labeled-value>
		</div>

		<div class="controls">
			<router-link :to="scenario.id" append class="btn btn-info">
				<span class="glyphicon glyphicon-edit"></span>
				Edit
			</router-link>
		</div>

		<form v-if="show.forms" class="forms-editor panel panel-default"
			@submit="handleSetForms"
		>
			<div class="panel-heading">
				<h3 class="panel-title">Forms</h3>
			</div>
			<div class="panel-body">
				<div>
					<fieldset v-for="{ type, forms } of formGroups">
						<legend>{{ ucfirst(type) }}</legend>

						<label v-for="form of forms" class="containing-label">
							<input type="checkbox" name="form_ids" :value="form.id" :checked="isFormAttached(form)" />
							{{ form.title }}
						</label>
					</fieldset>
				</div>
			</div>
			<div class="panel-footer">
				<button type="button" class="btn btn-default" @click="show.forms = false">
					Cancel
				</button>

				<button type="submit" class="btn btn-primary">
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
	.scenario-list-item {
		padding: 1em;
		display: grid;
		grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
		grid-template-rows: auto;
		grid-template-areas:
			'id title text forms controls'
			'forms-editor forms-editor forms-editor forms-editor forms-editor';
		grid-gap: 0.5em;
		font-size: 1.1em;
	}

	.scenario-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.03);
	}

	.scenario-list-item + .scenario-list-item {
		border-top: 1px solid #aaa;
	}

	.scenario-id {
		grid-area: id;
	}

	.scenario-title {
		grid-area: title;
	}

	.scenario-text {
		grid-area: text;
	}

	.scenario-forms {
		grid-area: forms;
	}

	.controls {
		grid-area: controls;
		display: flex;
		flex-direction: column;
	}

	.controls .btn {
		display: block;
		margin: 0.25em;
		text-align: center;
	}

	.scenario-forms ul {
		padding-left: 1em;
		margin-bottom: 1em;
	}

	.forms-editor {
		grid-area: forms-editor;
		font-size: 1rem;
	}

	.forms-editor fieldset + fieldset {
		margin-top: 1em;
	}

	.forms-editor legend {
		margin-bottom: 0.25em;
	}

	.forms-editor label {
		font-weight: normal;
	}
</style>

<script>
import gql from 'graphql-tag';

import LabeledValue from '#/LabeledValue.vue';

import { SCENARIOS_FIELDS } from '@/graphql/beyond-milestones/scenario.js';

import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		scenario: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			formGroups: [],
			show: {
				forms: false
			}
		};
	},
	apollo: {
		formGroups: {
			query: gql`
				query {
					formGroups(sortByTitle: true) {
						type
						forms {
							id
							title
						}
					}
				}
			`,
			fetchPolicy: 'cache-first'
		}
	},
	methods: {
		ucfirst,
		isFormAttached(form) {
			return Boolean(this.scenario.forms.find(f => f.id === form.id));
		},
		handleSetForms(event) {
			event.preventDefault();

			const formData = new FormData(event.target);
			const form_ids = formData.getAll('form_ids');

			this.$apollo.mutate({
				mutation: gql`
					mutation ManageScenarioSetForms(
						$scenario_id: ID!
						$form_ids: [ID!]!
					) {
						setScenarioForms(
							scenario_id: $scenario_id
							form_ids: $form_ids
						) {
							...ManageScenariosFields
						}
					}
					${SCENARIOS_FIELDS}
				`,
				variables: {
					scenario_id: this.scenario.id,
					form_ids
				}
			}).then(() => {
				this.show.forms = false;
			});
		}
	},
	components: {
		LabeledValue
	}
};
</script>
