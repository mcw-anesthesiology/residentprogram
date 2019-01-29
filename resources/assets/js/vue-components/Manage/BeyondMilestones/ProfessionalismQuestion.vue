<template>
	<div class="container body-block manage-professionalism-question">
		<h2>Professionalism question</h2>

		<p v-if="$apollo.loading">Loading...</p>
		<form v-else class="form" @submit="handleSubmit">
			<div class="form-group">
				<label class="containing-label">
					Title
					<input type="text" name="title" class="form-control" v-model="professionalismQuestion.title" />
				</label>
			</div>


			<div class="form-group">
				<label class="containing-label">
					Intro
					<textarea type="text" name="intro" class="form-control" v-model="professionalismQuestion.intro"></textarea>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Text
					<textarea type="text" name="text" class="form-control" v-model="professionalismQuestion.text"></textarea>
				</label>
			</div>

			<options-input v-model="professionalismQuestion.options" type="boolean" />

			<div class="btn-lg-submit-container">
				<confirmation-button v-if="id !== 'new'" class="btn btn-danger" @click="handleDelete">
					Delete
				</confirmation-button>

				<router-link class="btn btn-default" to="/professionalism-questions">
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

import { PROFESSIONALISM_QUESTIONS_QUERY } from '@/graphql/beyond-milestones/professionalism-question.js';

import { ucfirst } from '@/modules/utils.js';
import { stripTypename } from '@/modules/graphql-utils.js';

const PROFESSIONALISM_QUESTION_FIELDS = gql`
	fragment ManageProfessionalismQuestionFields on ProfessionalismQuestion {
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

const PROFESSIONALISM_QUESTION_QUERY = gql`
	query ManageProfessionalismQuestionQuery($id: ID!) {
		professionalismQuestion(id: $id) {
			...ManageProfessionalismQuestionFields
		}
	}
	${PROFESSIONALISM_QUESTION_FIELDS}
`;

const CREATE_PROFESSIONALISM_QUESTION_MUTATION = gql`
	mutation CreateProfessionalismQuestion(
		$title: String
		$intro: String
		$text: String!
		$options: [ProfessionalismQuestionOptionInput!]!
	) {
		createProfessionalismQuestion(
			title: $title
			intro: $intro
			text: $text
			options: $options
		) {
			...ManageProfessionalismQuestionFields
		}
	}
	${PROFESSIONALISM_QUESTION_FIELDS}
`;

const UPDATE_PROFESSIONALISM_QUESTION_MUTATION = gql`
	mutation UpdateProfessionalismQuestion(
		$id: ID!
		$title: String
		$intro: String
		$text: String
		$options: [ProfessionalismQuestionOptionInput!]
	) {
		updateProfessionalismQuestion(
			id: $id
			title: $title
			intro: $intro
			text: $text
			options: $options
		) {
			...ManageProfessionalismQuestionFields
		}
	}
	${PROFESSIONALISM_QUESTION_FIELDS}
`;


export default {
	props: {
		id: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			professionalismQuestion: {
				title: '',
				intro: '',
				text: '',
				options: []
			}
		};
	},
	apollo: {
		professionalismQuestion: {
			query: PROFESSIONALISM_QUESTION_QUERY,
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
				? CREATE_PROFESSIONALISM_QUESTION_MUTATION
				: UPDATE_PROFESSIONALISM_QUESTION_MUTATION;

			const variables = stripTypename({
				...this.professionalismQuestion,
				options: this.professionalismQuestion.options.map(stripTypename)
			});

			let update;
			if (this.id === 'new') {
				update = (store, { data: { createProfessionalismQuestion } }) => {
					const query = PROFESSIONALISM_QUESTIONS_QUERY;
					const data = store.readQuery({ query });
					data.professionalismQuestions.push(createProfessionalismQuestion);
					store.writeQuery({ query, data });
				};
			}

			this.$apollo.mutate({
				mutation,
				variables,
				update
			}).then(() => {
				this.$router.push('/professionalism-questions');
			});
		},
		handleDelete() {
			this.$apollo.mutate({
				mutation: gql`
					mutation DeleteProfessionalismQuestion($id: ID!) {
						deleteProfessionalismQuestion(id: $id) {
							...ManageProfessionalismQuestionFields
						}
					}
					${PROFESSIONALISM_QUESTION_FIELDS}
				`,
				variables: {
					id: this.id
				}
			}).then(() => {
				this.$router.push('/professionalism-questions');
			});
		}
	},
	components: {
		ConfirmationButton: () => import('#/ConfirmationButton.vue'),
		OptionsInput: () => import('./OptionsInput.vue')
	}
};
</script>
