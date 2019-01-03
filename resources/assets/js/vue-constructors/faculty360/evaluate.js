import Vue from '@/vue-constructors/vue.js';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import FormReader from '@/vue-components/FormReader/FormReader.vue';

import { logError } from '@/modules/errors.js';
import {
	getFetchHeaders,
	jsonOrThrow
} from '@/modules/utils.js';
import { processQuestionTemplates } from '@/modules/evaluation-utils.js';
import { ADMIN_EMAIL } from '@/modules/constants.js';

const questionTemplates = new Map([
	['{{ subject_name }}', evaluation => evaluation.subject.full_name],
	['{{ subject_first }}', evaluation => evaluation.subject.first_name],
	['{{ subject_last }}', evaluation => evaluation.subject.last_name]
]);

export default function createFaculty360Evaluate(el, propsData) {
	return new Vue({
		el,
		mixins: [HasAlerts],
		props: {
			evaluation: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				contents: processQuestionTemplates(
					this.evaluation,
					questionTemplates
				),

				submitSuccessful: false
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
					logError(err);
					this.alerts.push({
						type: 'error',
						html: `<strong>Error:</strong> There was a problem
							saving your progress. Please let me know at
							<a href="mailto:${ADMIN_EMAIL}">
								${ADMIN_EMAIL}
							</a>`
					});
				});
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
					logError(err);
					this.alerts.push({
						type: 'error',
						html: `<strong>Error:</strong> There was a problem
							submitting the form. Please let me know at
							<a href="mailto:${ADMIN_EMAIL}">
								${ADMIN_EMAIL}
							</a>`
					});
				});
			}
		},

		components: {
			FormReader
		}
	});
}
