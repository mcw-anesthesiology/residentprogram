import Vue from '@/vue-constructors/vue.js';

import AlertList from '@/vue-components/AlertList.vue';
import FormReader from '@/vue-components/FormReader/FormReader.vue';

export default function createFaculty360ViewForm(el, propsData) {
	return new Vue({
		el,
		props: {
			form: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				alerts: []
			};
		},
		propsData,

		components: {
			AlertList,
			FormReader
		}
	});
}
