<template>
	<div class="container body-block">
		<h2>Professionalism questions</h2>

		<router-link to="new" append class="btn btn-success">
			<span class="glyphicon glyphicon-plus"></span>
			Add professionalism question
		</router-link>

		<component-list :fields="professionalismQuestionFields" :items="professionalismQuestions">
			<template slot-scope="professionalismQuestion">
				<question-list-item :question="professionalismQuestion" />
			</template>
		</component-list>
	</div>
</template>

<script>
import { PROFESSIONALISM_QUESTIONS_QUERY } from '@/graphql/beyond-milestones/professionalism-question.js';


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
		QuestionListItem: () => import('./QuestionListItem.vue')
	}
};
</script>
