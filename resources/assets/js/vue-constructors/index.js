/* global process */

import Vue from 'vue';
import Rollbar from 'rollbar';

import { ROLLBAR_TOKEN } from '@/modules/constants.js';

if (process.env.NODE_ENV === 'production') {
	const rollbar = new Rollbar({
		accessToken: ROLLBAR_TOKEN,
		captureUncaught: true,
		captureUnhandledRejections: false,
		payload: {
			environment: 'production'
		}
	});

	Vue.config.errorHandler = (err, vm, info) => {
		rollbar.error(`Error from Vue: ${err}, info: ${info}, vm: ${JSON.stringify(vm)}`);
	};
}

Vue.directive('visible', (el, {value, oldValue, modifiers}) => {
	if(modifiers.once && el.style.visibility === 'visible')
		return;

	if(value !== oldValue){
		el.style.transition = oldValue
			? 'opacity 0.1s ease-out, visibility 0s 0.1s'
			: 'opacity 0.1s ease-out';

		el.style.visibility = value
			? 'visible'
			: 'hidden';
		el.style.opacity = value
			? 1
			: 0;
	}
});
