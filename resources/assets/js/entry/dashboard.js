import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';

import store from '@/vue-constructors/store.js';

import StartEndDate from '#/StartEndDate.vue';
import HomeDashboard from '#/Dashboard/Dashboard.vue';
import MenteeDashboard from '#/Dashboard/Mentees.vue';
import { isoDateStringObject, currentYear } from '@/modules/date-utils.js';

new Vue({
	el: 'main',
	store,
	router: new VueRouter({
		routes: [
			{
				path: '/',
				component: HomeDashboard
			},
			{
				path: '/mentees',
				component: MenteeDashboard
			}
		]
	}),
	data() {
		return {
			dates: isoDateStringObject(currentYear())
		};
	},
	components: {
		StartEndDate
	}
});
