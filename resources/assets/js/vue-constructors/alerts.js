import Vue from './vue.js';
import store from './store.js';

import StoredAlertList from '#/StoredAlertList.vue';

export function createGlobalAlerts(el) {
	return new Vue({
		el,
		store,
		template: `
			<div class="container global-alert-list">
				<stored-alert-list></stored-alert-list>
			</div>
		`,
		components: {
			StoredAlertList
		}
	});
}
