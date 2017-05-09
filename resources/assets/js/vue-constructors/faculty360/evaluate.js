import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import FormReader from 'vue-components/FormReader/FormReader.vue';

import {
	getFetchHeaders,
	jsonOrThrow
} from 'modules/utils.js';
import { ADMIN_EMAIL } from 'modules/constants.js';

export default function createFaculty360Evaluate(el, propsData) {
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
				contents: this.evaluation.contents,

				submitSuccessful: false,

				alerts: []
			};
		},
		propsData,

		methods: {
			handleInput(form) {
				this.contents = form.contents;
			},
			handleSave(form) {
				fetch(`/faculty360/evaluations/${this.evaluation.hash}/save`, {
					method: 'POST', // PATCH
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						contents: form.contents
					})
				}).then(jsonOrThrow).then(() => {
					this.alerts.push({
						type: 'success',
						text: 'Progress saved successfully!'
					});
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: `<strong>Error:</strong> There was a problem
							saving your progress. Please let me know at
							<a href="mailto:${ADMIN_EMAIL}">
								${ADMIN_EMAIL}
							</a>`
					});
				});
				console.log(form);
			},
			handleSubmit(form) {
				fetch(`/faculty360/evaluations/${this.evaluation.hash}/submit`, {
					method: 'POST', // PATCH
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						contents: form.contents
					})
				}).then(jsonOrThrow).then(() => {
					this.submitSuccessful = true;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: `<strong>Error:</strong> There was a problem
							submitting the form. Please let me know at
							<a href="mailto:${ADMIN_EMAIL}">
								${ADMIN_EMAIL}
							</a>`
					});
				});
				console.log(form);
			}
		},

		components: {
			AlertList,
			FormReader
		}
	});
}
