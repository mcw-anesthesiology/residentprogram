import Vue from 'vue';

import { rollbar } from '@/modules/errors.js';

Vue.config.errorHandler = (err, vm, info) => {
	rollbar.error(`Error from Vue: ${err}, info: ${info}, vm: ${JSON.stringify(vm)}`);
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
