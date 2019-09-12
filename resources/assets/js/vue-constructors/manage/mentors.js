import Vue, { apolloProvider } from '@/vue-constructors/vue.js';

export default function createManageMentors(el, propsData) {
	return new Vue({
		el,
		apolloProvider,
		props: {},
		propsData,
		components: {
			ManageMentors: () => import('#/Manage/Mentors/Page.vue')
		}
	});
}
