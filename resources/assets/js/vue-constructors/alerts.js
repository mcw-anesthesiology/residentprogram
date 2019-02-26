import Vue from './vue.js';
import store from './store.js';

import AlertList from '#/AlertList.vue';

export function createGlobalAlerts(el) {
	return new Vue({
		el,
		store,
		template: `
			<div class="container global-alert-list">
				<alert-list v-model="$store.state.alerts"></alert-list>
			</div>
		`,
		components: {
			AlertList
		}
	});
}
