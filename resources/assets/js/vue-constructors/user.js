/* @flow */

import Vue from 'vue';

export function createUserSettingsPage(el, propsData) {
	return new Vue({
		el,
		props: {

		},
		propsData,
		data() {
			return {
				test: 'hey'
			};
		}
	});
}
