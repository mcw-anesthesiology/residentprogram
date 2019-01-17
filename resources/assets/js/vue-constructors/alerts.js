import Vue from './vue.js';
import store from './store.js';

import AlertList from '#/AlertList.vue';

export function createGlobalAlerts(el) {
	return new Vue({
		el,
		store,
		template: `
			<alert-list v-model="$store.state.alerts"></alert-list>
		`,
		components: {
			AlertList
		}
	});
}
