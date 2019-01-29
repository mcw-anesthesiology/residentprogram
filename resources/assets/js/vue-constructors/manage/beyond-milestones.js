import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';

export default function createManageBeyondMilestones(el) {
	return new Vue({
		el,
		apolloProvider,
		router: new VueRouter({
			routes: [
				{
					path: '/scenarios',
					component: () => import('#/Manage/BeyondMilestones/Scenarios.vue'),
					props: true
				},
				{
					path: '/scenarios/:id',
					component: () => import('#/Manage/BeyondMilestones/Scenario.vue'),
					props: true
				},
				{
					path: '/additional-questions',
					component: () => import('#/Manage/BeyondMilestones/AdditionalQuestions.vue'),
					props: true
				},
				{
					path: '/additional-questions/:id',
					component: () => import('#/Manage/BeyondMilestones/AdditionalQuestion.vue'),
					props: true
				},
				{
					path: '/professionalism-questions',
					component: () => import('#/Manage/BeyondMilestones/ProfessionalismQuestions.vue'),
					props: true
				},
				{
					path: '/professionalism-questions/:id',
					component: () => import('#/Manage/BeyondMilestones/ProfessionalismQuestion.vue'),
					props: true
				},
			]
		})
	});
}
