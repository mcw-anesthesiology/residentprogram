<template>
	<div class="container body-block">
		<h2>Additional questions</h2>

		<router-link to="new" append class="btn btn-success">
			<span class="glyphicon glyphicon-plus"></span>
			Add question
		</router-link>

		<component-list :fields="additionalQuestionFields" :items="additionalQuestions">
			<template slot-scope="additionalQuestion">
				<question-list-item :question="additionalQuestion" />
			</template>
		</component-list>
	</div>
</template>

<script>
import { ADDITIONAL_QUESTIONS_QUERY } from '@/graphql/beyond-milestones/additional-question.js';

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
