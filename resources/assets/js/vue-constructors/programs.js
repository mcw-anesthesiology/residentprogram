import Vue from './index.js';

import ProgramsDashboard from '@/vue-components/Programs/Dashboard.vue';

export function createProgramsDashboard(el, propsData) {
	return new Vue({
		el,
		propsData,
		components: {
			ProgramsDashboard
		}
	});
}
