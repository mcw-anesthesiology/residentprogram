import Vue from '@/vue-constructors/index.js';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import FormBuilder from '@/vue-components/FormBuilder/FormBuilder.vue';

import { handleError } from '@/modules/errors.js';
import {
	getFetchHeaders,
	jsonOrThrow
} from '@/modules/utils.js';

export default function createFaculty360CreateForm(el) {
	return new Vue({
		el,
		mixins: [HasAlerts],
		data() {
			return {
				newFormId: null
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
					handleError(err, this, 'There was a problem saving the form');
				});
			}
		},

		components: {
			FormBuilder
		}
	});
}
