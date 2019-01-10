import Vue, { apolloProvider } from '@/vue-constructors/vue.js';

export default function createManageBeyondMilestones(el) {
	return new Vue({
		el,
		apolloProvider,
		components: {
			ManageScenarios: () => import('#/Manage/BeyondMilestones/Scenarios.vue'),
			ManageProfessionalismQuestions: () => import('#/Manage/BeyondMilestones/ProfessionalismQuestions.vue')
		}
	});
}
