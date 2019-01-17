import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import store from '@/vue-constructors/store.js';

export default function createManageUserFeatures(el) {
	return new Vue({
		el,
		store,
		apolloProvider,
		components: {
			UserFeaturesDashboard: () => import('#/Manage/UserFeatures/Dashboard.vue')
		}
	});
}
