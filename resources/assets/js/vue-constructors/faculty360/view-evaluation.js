import Vue from '@/vue-constructors/index.js';

import FormReader from '@/vue-components/FormReader/FormReader.vue';

export default function createFaculty360ViewEvaluation(el, propsData) {
	return new Vue({
		el,
		props: {
			evaluation: {
				type: Object,
				required: true
			}
		},
		data() {
			return {

			};
		},
		propsData,

		components: {
			FormReader
		}
	});
}
