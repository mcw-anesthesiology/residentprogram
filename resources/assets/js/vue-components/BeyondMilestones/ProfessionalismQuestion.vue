<template>
	<section class="professionalism-question">
		<h2 v-if="title">{{ title }}</h2>
		<div v-if="intro" class="intro">{{ intro }}</div>

		<div class="text">{{ text }}</div>

		<fieldset>
			<label v-for="option of options">
				<input type="radio" :value="option.value"
					:checked="isSelected(option)"
					:readonly="$apollo.loading || professionalismResponse !== null"
					@change="handleSelect(option)"
				/>
				{{ option.text }}
			</label>
		</fieldset>
	</section>
</template>

<style scoped>
	fieldset {
		display: flex;
		flex-wrap: wrap;
	}

	fieldset label {
		display: flex;
		align-items: center;
		margin: 0.5em;
	}

	label input {
		vertical-align: middle;
		margin: 0 0.25em 0 0;
	}
</style>

<script>
import gql from 'graphql-tag';

const PROFESSIONALISM_RESPONSE_QUERY = gql`
	query ProfessionalismQuestionResponse($question_id: ID!, $evaluation_id: ID!) {
		professionalismResponse(question_id: $question_id, evaluation_id: $evaluation_id) {
			id
			value
		}
	}
`;

export default {
	props: {
		id: String,
		title: String,
		intro: String,
		text: String,
		options: Array,

		evaluationId: Number,
		readonly: Boolean
	},
	data() {
		return {
			professionalismResponse: null
		};
	},
	apollo: {
		profesionalismResponse: {
			query: PROFESSIONALISM_RESPONSE_QUERY,
			variables() {
				return {
					question_id: this.id,
					evaluation_id: this.evaluationId
				};
			}
		}
	},
	methods: {
		isSelected(option) {
			return this.professionalismResponse !== null && this.professionalismResponse.value === option.value;
		},
		handleSelect(option) {
			if (this.readonly)
				return;

			this.$apollo.mutate({
				mutation: gql`
					mutation AddProfessionalismResponse($question_id: ID!, $evaluation_id: ID!, $value: Number!) {
						addProfessionalismResponse(question_id: $question_id, evaluation_id: $evaluation_id, value: $value) {
							id
							value
						}
					}
				`,
				variables: {
					question_id: this.id,
					evaluation_id: this.evaluationId,
					value: option.value
				},
				update(store, { data: { addProfessionalismResponse } }) {
					store.writeQuery({
						query: PROFESSIONALISM_RESPONSE_QUERY,
						data: {
							professionalismResponse: addProfessionalismResponse
						}
					});
				}
			});
		}
	}
};
</script>
