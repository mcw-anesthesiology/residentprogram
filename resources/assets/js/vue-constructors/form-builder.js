import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import FormBuilder from 'vue-components/FormBuilder/FormBuilder.vue';

import { getFetchHeaders } from 'modules/utils.js';

export function createFormBuilder(el, propsData){
	return new Vue({
		el,
		props: {
			oldFormContents: {
				type: Object,
				required: false
			}
		},
		data(){
			return {
				alerts: []
			};
		},
		propsData,
		
		methods: {
			handleSubmit(form) {
				fetch('/forms', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify(form)
				}).then(response => {
					if(response.ok)
						return response.text();
					else
						throw new Error(response);
				}).then(response => {
					if(response === 'success')
						window.location = '/manage/forms';
					else
						throw new Error(response);
				}).catch(err => {
					this.alerts.push({
						type: 'error',
						text: 'Error saving form'
					});
					console.error(err);
				});
			}
		},
		
		components: {
			AlertList,
			FormBuilder
		}
	});
}
