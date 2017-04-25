import Vue from 'vue';

import DataTable from 'vue-components/DataTable.vue';
import JsonSchemaEditor from 'vue-components/JsonSchemaEditor.vue';

import { getFetchHeaders } from 'modules/utils.js';

export default function createManageMerit(el) {
	return new Vue({
		el,
		props: {
			
		},
		data() {
			return {
				merit: null
			};
		},
		
		methods: {
			addMerit() {
				this.merit = {
					name: '',
					form: null
				};
			},
			handleMeritSubmit(merit) {
				this.merit = merit;
				fetch('/merits', {
					method: 'POST',
					data: 
				})
			}
		},
		
		components: {
			DataTable,
			JsonSchemaEditor
		}
	});
}
