import Vue from 'vue';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import FormBuilder from '@/vue-components/FormBuilder/FormBuilder.vue';

import { handleError } from '@/modules/errors.js';
import { getFetchHeaders } from '@/modules/utils.js';

export function createFormBuilder(el, propsData){
	return new Vue({
		el,
		mixins: [HasAlerts],
		props: {
			oldFormContents: {
				type: Object,
				required: false
			}
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
					handleError(err, this, 'There was a problem saving the form');
				});
			}
		},

		components: {
			FormBuilder
		}
	});
}
