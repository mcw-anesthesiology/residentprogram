import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';

import MeritChecklist from '@/vue-components/MeritCompensation/Checklist/Checklist.vue';

Vue.use(VueRouter);

const router = new VueRouter();

router.afterEach(() => {
	window.scroll({
		top: 0,
		left: 0
	});
});

export default function createViewMeritReportForm(el, propsData) {
	return new Vue({
		el,
		router,
		props: {
			form: {
				type: Object,
				required: true
			},
			user: {
				type: Object,
				required: true
			}
		},
		propsData,
		components: {
			MeritChecklist
		}
	});
}
