import Vue from 'vue';

import BootstrapAlert from '@/vue-components/BootstrapAlert.vue';

import { logError } from '@/modules/errors.js';
import { getAcknowledgeText } from '@/modules/niceties.js';
import { fetchConfig, okOrThrow, jsonOrThrow } from '@/modules/utils.js';

export default function createNews(el, propsData) {
	return new Vue({
		el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData,
		data() {
			return {
				alertItems: []
			};
		},
		template: `
			<div v-if="alertItems && alertItems.length > 0"
					class="news-list container">
				<div class="panel-body">
					<bootstrap-alert v-for="alert of alertItems"
							:key="alert.id"
							v-bind="alert"
							dismissable
							@close="handleDismiss(alert.id)">
						<div class="text-right">
							<button type="button" class="btn btn-default">
								{{ getAcknowledgeText() }}
							</button>
						</div>
					</bootstrap-alert>
				</div>
			</div>
		`,
		mounted() {
			this.fetchUnseenNewsItems();
		},
		methods: {
			getAcknowledgeText,
			fetchUnseenNewsItems() {
				fetch('/news-items/unseen', {
					...fetchConfig()
				}).then(jsonOrThrow).then(newsItems => {
					this.alertItems = newsItems;
				}).catch(err => {
					// FIXME: Show this somewhere
					logError(err);
				});
			},
			handleDismiss(alertId) {
				fetch(`/news-items/${alertId}/dismiss`, {
					...fetchConfig(),
					method: 'POST', // PATCH
					body: JSON.stringify({
						_method: 'PATCH'
					})
				}).then(okOrThrow).then(() => {
					this.alertItems = this.alertItems.filter(item =>
						item.id !== alertId
					);
				}).catch(err => {
					// TODO: Display this somewhere
					// handleError(err, this, )
					logError(err);
				});
			},
			handleRemindLater(alertId) {
				// TODO
				// fetch(`/news-items/${alertId}/temporarily-dismiss`, {
				// 	...fetchConfig(),
				// 	method: 'POST', // PATCH
				// 	body: JSON.stringify({
				// 		_method: 'PATCH'
				// 	})
				// })
			}
		},
		components: {
			BootstrapAlert
		}
	});
}
