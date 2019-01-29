<template>
	<div class="container body-block manage-additional-question">
		<h2>Additional question</h2>

		<p v-if="$apollo.loading">Loading...</p>
		<form v-else class="form" @submit="handleSubmit">
			<div class="form-group">
				<label class="containing-label">
					Title
					<input type="text" name="title" class="form-control" v-model="additionalQuestion.title" />
				</label>
			</div>


			<div class="form-group">
				<label class="containing-label">
					Intro
					<textarea type="text" name="intro" class="form-control" v-model="additionalQuestion.intro"></textarea>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Text
					<textarea type="text" name="text" class="form-control" v-model="additionalQuestion.text"></textarea>
				</label>
			</div>

			<options-input v-model="additionalQuestion.options" type="number" />

			<div class="btn-lg-submit-container">
				<confirmation-button v-if="id !== 'new'" class="btn btn-danger" @click="handleDelete">
					Delete
				</confirmation-button>

				<router-link class="btn btn-default" to="/additional-questions">
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

import { ADDITIONAL_QUESTIONS_QUERY } from '@/graphql/beyond-milestones/additional-question.js';

import { ucfirst } from '@/modules/utils.js';
import { stripTypename } from '@/modules/graphql-utils.js';

const ADDITIONAL_QUESTION_FIELDS = gql`
	fragment ManageAdditionalQuestionFields on AdditionalQuestion {
		id
		title
		intro
		text
		options {
			text
			value
		}
	}
`;

const ADDITIONAL_QUESTION_QUERY = gql`
	query ManageAdditionalQuestionQuery($id: ID!) {
		additionalQuestion(id: $id) {
			...ManageAdditionalQuestionFields
		}
	}
	${ADDITIONAL_QUESTION_FIELDS}
`;

const CREATE_ADDITIONAL_QUESTION_MUTATION =gql`
	mutation CreateAdditionalQuestionMutation(
		$title: String
		$intro: String
		$text: String!
		$options: [AdditionalQuestionOptionInput!]!
	) {
		createAdditionalQuestion(
			title: $title
			intro: $intro
			text: $text
			options: $options
		) {
			...ManageAdditionalQuestionFields
		}
	}
	${ADDITIONAL_QUESTION_FIELDS}
`;

const UPDATE_ADDITIONAL_QUESTION_MUTATION =gql`
	mutation UpdateAdditionalQuestionMutation(
		$id: ID!
		$title: String
		$intro: String
		$text: String
		$options: [AdditionalQuestionOptionInput!]
	) {
		updateAdditionalQuestion(
			id: $id
			title: $title
			intro: $intro
			text: $text
			options: $options
		) {
			...ManageAdditionalQuestionFields
		}
	}
	${ADDITIONAL_QUESTION_FIELDS}
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
			additionalQuestion: {
				title: '',
				intro: '',
				text: '',
				options: []
			}
		};
	},
	apollo: {
		additionalQuestion: {
			query: ADDITIONAL_QUESTION_QUERY,
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

			const mutation = this.id === 'new'
				? CREATE_ADDITIONAL_QUESTION_MUTATION
				: UPDATE_ADDITIONAL_QUESTION_MUTATION;

			const variables = stripTypename({
				...this.additionalQuestion,
				options: this.additionalQuestion.options.map(stripTypename)
			});

			let update;
			if (this.id === 'new') {
				update = (store, { data: { createAdditionalQuestion } }) => {
					const query = ADDITIONAL_QUESTIONS_QUERY;
					const data = store.readQuery({ query });
					data.additionalQuestions.push(createAdditionalQuestion);
					store.writeQuery({ query, data });
				};
			}

			this.$apollo.mutate({
				mutation,
				variables,
				update
			}).then(() => {
				this.$router.push('/additional-questions');
			});
		},
		handleDelete() {
			this.$apollo.mutate({
				mutation: gql`
					mutation DeleteAdditionalQuestion($id: ID!) {
						deleteAdditionalQuestion(id: $id) {
							...ManageAdditionalQuestionFields
						}
					}
					${ADDITIONAL_QUESTION_FIELDS}
				`,
				variables: {
					id: this.id
				}
			}).then(() => {
				this.$router.push('/additional-questions');
			});
		}
	},
	components: {
		ConfirmationButton: () => import('#/ConfirmationButton.vue'),
		OptionsInput: () => import('./OptionsInput.vue')
	}
};
</script>
