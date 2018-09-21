import Vue from './index.js';
import store from './store.js';

import ProgramsDashboard from '@/vue-components/Programs/Dashboard.vue';

export function createProgramsDashboard(el, propsData) {
	return new Vue({
		el,
		propsData,
		store,
		components: {
			ProgramsDashboard
		}
	});
}
