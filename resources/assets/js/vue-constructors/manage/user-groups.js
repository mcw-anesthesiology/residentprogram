import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import store from '@/vue-constructors/store.js';

import UserGroups from '#/Manage/UserGroups/UserGroups.vue';

export default function createManageUsers(el) {
	return new Vue({
		el,
		apolloProvider,
		store,
		components: {
			UserGroups
		}
	});
}
