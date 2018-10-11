import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';

import store from '@/vue-constructors/store.js';

import StartEndDate from '#/StartEndDate.vue';
import HomeDashboard from '#/Dashboard/Dashboard.vue';
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
				component: () => import('#/Dashboard/Mentees/Mentees.vue')
			},
			{
				path: '/programs',
				component: () => import('#/Programs/Dashboard.vue')
			}
		]
	}),
	data() {
		return {
			dates: isoDateStringObject(currentYear())
		};
	},
	mounted() {
		this.$store.dispatch('fetchUser');
		this.$store.dispatch('mentorships/fetchMentees');
		this.$store.dispatch('programs/fetch');
	},
	computed: {
		...mapState(['user']),
		...mapState('mentorships', [
			'mentees'
		]),
		...mapState('programs', [
			'programs'
		])
	},
	components: {
		StartEndDate
	}
});
