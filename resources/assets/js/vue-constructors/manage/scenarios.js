import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import VueRouter from 'vue-router';

import HasAlerts from '@/vue-mixins/HasAlerts.js';


import store from '@/vue-constructors/store.js';



export default function createManageScenarios(el, propsData) {
	return new Vue({
		el,
		apolloProvider,
		store,
		mixins: [HasAlerts],
		router: new VueRouter({
			routes: [
				{
					path: '/form-scenarios',
					component: () => import('#/Manage/Scenarios/FormScenario.vue')
				}
			]
		}),
		props: {

		},
		propsData
	});
}
