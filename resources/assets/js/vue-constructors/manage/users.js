import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';

import { renderUserType } from '@/modules/user-utils.js';

export const USER_TYPES = [
	'resident',
	'fellow',
	'faculty',
	'app',
	'staff',
	'external',
	'admin'
];

export default function createManageUsers(el) {
	return new Vue({
		el,
		apolloProvider,
		data() {
			return {
				USER_TYPES
			};
		},
		router: new VueRouter({
			routes: [
				{
					path: '/',
					component: () => import('#/Manage/Users/Dashboard.vue'),
					props: true
				},
				{
					path: '/:id',
					component: () => import('#/Manage/Users/User.vue'),
					props: true
				}
			]
		}),
		methods: {
			renderUserType
		}
	});
}
