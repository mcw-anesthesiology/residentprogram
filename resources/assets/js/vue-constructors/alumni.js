import Vue from 'vue';
import VueRouter from 'vue-router';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import EditAlumni from 'vue-components/Alumni/Edit.vue';
import AlumniSubscription from 'vue-components/Alumni/Subscription.vue';

Vue.use(VueRouter);

export function createAlumni(el, propsData) {
	return new Vue({
		mixins: [
			HasAlerts
		],
		el,
		props: {
			alum: {
				type: Object,
				required: true
			}
		},
		propsData,

		router: new VueRouter({
			routes: [
				{
					path: '/',
					component: EditAlumni,
					props: {
						alum: this.alum
					}
				},
				{
					path: '/subscription',
					component: AlumniSubscription,
					props: {
						alum: this.alum
					}
				}
			]
		})
	});
}
