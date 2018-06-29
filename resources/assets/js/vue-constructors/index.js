import Vue from 'vue';

import { rollbar } from '@/modules/errors.js';

export { default as createNews } from './news.js';
export { default as createCaseOverlaps } from './case-overlaps.js';

Vue.config.errorHandler = (err, vm, info) => {
	rollbar.error(`Error from Vue: ${err}, info: ${info}`);
	console.error(err, info);
};

Vue.config.warnHandler = (msg, vm, trace) => {
	rollbar.warning(`Warning from Vue: ${msg}, trace: ${trace}`);
	console.warn(msg, trace);
};

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

export default Vue;
