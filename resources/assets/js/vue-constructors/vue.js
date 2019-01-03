import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueApollo from 'vue-apollo';

import { rollbar } from '@/modules/errors.js';
import apolloClient from '@/modules/apollo-client.js';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueApollo);

Vue.config.errorHandler = (err, vm, info) => {
	rollbar.error(`Error from Vue: ${err}`, { info, vm });
	console.error(err, info);
};

Vue.config.warnHandler = (msg, vm, trace) => {
	rollbar.warning(`Warning from Vue: ${msg}`, { trace, vm });
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

export const apolloProvider = new VueApollo({
	defaultClient: apolloClient
});
