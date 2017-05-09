import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import FormBuilder from 'vue-components/FormBuilder/FormBuilder.vue';

import {
	getFetchHeaders,
	jsonOrThrow
} from 'modules/utils.js';

export default function createFaculty360CreateForm(el) {
	return new Vue({
		el,
		data() {
			return {
				newFormId: null,
				
				alerts: []
			};
		},
		
		methods: {
			handleSubmit(form) {
				fetch('/faculty360/forms', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify(form)
				}).then(jsonOrThrow).then(response => {
					this.newFormId = response.id;
					this.redirectTimeout = window.setTimeout(() => {
						window.location = `/faculty360/forms/${response.id}/view`;
					}, 2000);
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem saving the form'
					});
				});
			}
		},
		
		components: {
			AlertList,
			FormBuilder
		}
	});
}
