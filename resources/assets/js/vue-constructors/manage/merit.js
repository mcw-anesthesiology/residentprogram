import Vue from 'vue';

import JsonSchemaEditor from 'vue-components/JsonSchemaEditor.vue';

export default function createManageMerit(el) {
	return new Vue({
		el,
		props: {
			
		},
		data() {
			return {
				schema: null
			};
		},
		
		components: {
			JsonSchemaEditor
		}
	});
}
