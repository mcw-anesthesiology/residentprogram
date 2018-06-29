import Vue from '@/vue-constructors/index.js';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ComponentList from '@/vue-components/ComponentList.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import RichDate from '@/vue-components/RichDate.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';

import { handleError } from '@/modules/errors.js';
import { renderDateRange } from '@/modules/date-utils.js';
import {
	getFetchHeaders,
	okOrThrow,
	jsonOrThrow,
	sortPropDates
} from '@/modules/utils.js';

export default function createManageScheduledRequests(el, propsData) {
	return new Vue({
		mixins: [
			HasAlerts
		],
		el,
		props: {

		},
		propsData,
		data() {
			return {
				scheduledRequests: []
			};
		},

		mounted() {
			this.fetchScheduledRequests();
		},

		computed: {
			scheduledRequestFields() {
				return [
					'id',
					'subject_name',
					'evaluator_name',
					'requestor_name',
					'form_title',
					'evaluation_date',
					'request_date',
				];
			},
			scheduledRequestFieldAccessors() {
				return {
					subject_name: request => request.subject.full_name,
					evaluator_name: request => request.evaluator.full_name,
					requestor_name: request => request.requestor.full_name,
					form_title: request => request.form.title,
					evaluation_date: request => renderDateRange(
						request.evaluation_date_start,
						request.evaluation_date_end
					)
				};
			},
			scheduledRequestSortFunctions() {
				return new Map([
					['evaluation_date', sortPropDates('evaluation_date_start')],
					['request_date', sortPropDates('request_date')]
				]);
			}
		},

		methods: {
			fetchScheduledRequests() {
				let query = $.param({
					with: {
						subject: [
							'full_name'
						],
						evaluator: [
							'full_name'
						],
						requestor: [
							'full_name'
						],
						form: [
							'title'
						]
					}
				});

				fetch(`/scheduled-requests?${query}`, {
					headers: getFetchHeaders(),
					credentials: 'same-origin',
				}).then(jsonOrThrow).then(scheduledRequests => {
					this.scheduledRequests = scheduledRequests;
				}).catch(err => {
					handleError(err, this, 'There was a problem fetching scheduled requests');
				});
			},
			deleteRequest(scheduledRequest) {
				fetch(`/scheduled-requests/${scheduledRequest.id}`, {
					method: 'POST', // DELETE,
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'DELETE'
					})
				}).then(okOrThrow).then(() => {
					this.scheduledRequests = this.scheduledRequests.filter(request =>
						request.id !== scheduledRequest.id
					);
				}).catch(err => {
					handleError(err, this, 'There was a problem deleting the scheduled request');
				});
			}
		},

		components: {
			ComponentList,
			ConfirmationButton,
			RichDate,
			RichDateRange
		}
	});
}
