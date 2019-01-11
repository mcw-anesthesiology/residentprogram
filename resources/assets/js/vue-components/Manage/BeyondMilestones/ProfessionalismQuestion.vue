<template>
	<div class="container body-block manage-professionalism-question">
		<h2>Professionalism question</h2>

		<form class="form" @submit="handleSubmit" v-if="professionalismQuestion">
			<div class="form-group">
				<label class="containing-label">
					Title
					<input type="text" name="title" class="form-control" :value="professionalismQuestion.title" />
				</label>
			</div>


			<div class="form-group">
				<label class="containing-label">
					Intro
					<textarea type="text" name="intro" class="form-control" :value="professionalismQuestion.intro"></textarea>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Text
					<textarea type="text" name="text" class="form-control" :value="professionalismQuestion.text"></textarea>
				</label>
			</div>

			<options-input v-model="options" type="boolean" />

			<div class="btn-lg-submit-container">
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

import { ucfirst } from '@/modules/utils.js';

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

export default {
	props: {
		id: {
			type: [String],
			required: true
		}
	},
	data() {
		return {
			professionalismQuestion: null,

			options: []
		};
	},
	apollo: {
		professionalismQuestion: {
			query: PROFESSIONALISM_QUESTION_QUERY,
			variables() {
				return {
					id: this.id
				};
			}
		}
	},
	watch: {
		professionalismQuestion(professionalismQuestion) {
			this.options = professionalismQuestion.options.map(({ __typename, ...o }) => o);
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
					mutation ManageProfessionalismQuestionMutation(
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
				`,
				variables: {
					id: this.id,
					title: formData.get('title'),
					intro: formData.get('intro'),
					text: formData.get('text'),
					options: this.options
				}
			}).then(() => {
				this.$router.push('/professionalism-questions');
			});
		}
	},
	components: {
		OptionsInput: () => import('./OptionsInput.vue')
	}
};
</script>
