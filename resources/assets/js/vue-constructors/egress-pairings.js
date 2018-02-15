import Vue from 'vue';

import EgressPairings from '@/vue-components/EgressPairings.vue';

export default function createEgressPairings(el) {
	return new Vue({
		el,
		render(h) {
			return h(EgressPairings);
		}
	});
}
