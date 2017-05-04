import Vue from 'vue';

import FormBuilder from 'vue-components/FormBuilder/FormBuilder.vue';

export default function createFaculty360CreateForm(el) {
	return new Vue({
		el,
		props: {
			
		},
		data() {
			return {
				
			};
		},
		
		methods: {
			handleSubmit(form) {
				// TODO
				console.log(form);
			}
		},
		
		components: {
			FormBuilder
		}
	});
}
