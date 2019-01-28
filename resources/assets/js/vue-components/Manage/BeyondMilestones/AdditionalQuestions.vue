<template>
	<div class="container body-block">
		<h2>Additional questions</h2>

		<component-list :fields="additionalQuestionFields" :items="additionalQuestions">
			<template slot-scope="additionalQuestion">
				<question-list-item :question="additionalQuestion" />
			</template>
		</component-list>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import { ADDITIONAL_QUESTIONS_FIELDS } from '@/graphql/beyond-milestones/additional-question.js';

const ADDITIONAL_QUESTIONS_QUERY = gql`
	query ManageAdditionalQuestionsQuery {
		additionalQuestions {
			...ManageAdditionalQuestionsFields
		}
	}
	${ADDITIONAL_QUESTIONS_FIELDS}
`;

export default {
	data() {
		return {
			additionalQuestions: [],

			additionalQuestionFields: [
				'title',
				'text'
			]
		};
	},
	apollo: {
		additionalQuestions: {
			query: ADDITIONAL_QUESTIONS_QUERY
		},
	},
	components: {
		ComponentList: () => import('#/ComponentList.vue'),
		QuestionListItem: () => import('./QuestionListItem.vue')
	}
};
</script>
