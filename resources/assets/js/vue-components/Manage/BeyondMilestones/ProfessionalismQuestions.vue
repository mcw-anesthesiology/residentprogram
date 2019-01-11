<template>
	<div class="container body-block">
		<h2>Professionalism questions</h2>

		<component-list :fields="professionalismQuestionFields" :items="professionalismQuestions">
			<template slot-scope="professionalismQuestion">
				<professionalism-question-list-item :professionalismQuestion="professionalismQuestion" />
			</template>
		</component-list>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import { PROFESSIONALISM_QUESTIONS_FIELDS } from '@/graphql/beyond-milestones/professionalism-question.js';

const PROFESSIONALISM_QUESTIONS_QUERY = gql`
	query ManageProfessionalismQuestionsQuery {
		professionalismQuestions {
			...ManageProfessionalismQuestionsFields
		}
	}
	${PROFESSIONALISM_QUESTIONS_FIELDS}
`;

export default {
	data() {
		return {
			professionalismQuestions: [],

			professionalismQuestionFields: [
				'title',
				'text'
			]
		};
	},
	apollo: {
		professionalismQuestions: {
			query: PROFESSIONALISM_QUESTIONS_QUERY
		},
	},
	components: {
		ComponentList: () => import('#/ComponentList.vue'),
		ProfessionalismQuestionListItem: () => import('./ProfessionalismQuestionListItem.vue')
	}
};
</script>
