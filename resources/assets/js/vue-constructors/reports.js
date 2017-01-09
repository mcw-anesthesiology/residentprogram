import Vue from 'vue';

import Reports from '../vue-components/Reports/Reports.vue';

export function createReports(el){
	return new Vue({
		el: el,
		render(h){
			return h(Reports);
		}
	});
}
