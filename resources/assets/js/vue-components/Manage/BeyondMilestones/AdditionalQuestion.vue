<template>
	<div class="container body-block manage-additional-question">
		<h2>Additional question</h2>

		<form class="form" @submit="handleSubmit" v-if="additionalQuestion">
			<div class="form-group">
				<label class="containing-label">
					Title
					<input type="text" name="title" class="form-control" :value="additionalQuestion.title" />
				</label>
			</div>


			<div class="form-group">
				<label class="containing-label">
					Intro
					<textarea type="text" name="intro" class="form-control" :value="additionalQuestion.intro"></textarea>
				</label>
			</div>

			<div class="form-group">
				<label class="containing-label">
					Text
					<textarea type="text" name="text" class="form-control" :value="additionalQuestion.text"></textarea>
				</label>
			</div>

			<options-input v-model="options" type="boolean" />

			<div class="btn-lg-submit-container">
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

import { ucfirst } from '@/modules/utils.js';

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

export default {
	props: {
		id: {
			type: [String],
			required: true
		}
	},
	data() {
		return {
			additionalQuestion: null,

			options: []
		};
	},
	apollo: {
		additionalQuestion: {
			query: ADDITIONAL_QUESTION_QUERY,
			variables() {
				return {
					id: this.id
				};
			}
		}
	},
	watch: {
		additionalQuestion(additionalQuestion) {
			this.options = additionalQuestion.options.map(({ __typename, ...o }) => o);
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
					mutation ManageAdditionalQuestionMutation(
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
				`,
				variables: {
					id: this.id,
					title: formData.get('title'),
					intro: formData.get('intro'),
					text: formData.get('text'),
					options: this.options
				}
			}).then(() => {
				this.$router.push('/additional-questions');
			});
		}
	},
	components: {
		OptionsInput: () => import('./OptionsInput.vue')
	}
};
</script>
