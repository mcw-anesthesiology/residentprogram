import Vue from '@/vue-constructors/vue.js';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import { handleError } from '@/modules/errors.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';

export function createAlumni(el, propsData) {
	return new Vue({
		mixins: [HasAlerts],
		el,
		props: {
			defaultAlum: {
				type: Object,
				required: true
			},
			hash: {
				type: String,
				required: true
			}
		},
		propsData,
		data: {
			alum: propsData.defaultAlum,
			show: {
				edit: true,
				sub: true
			}
		},

		computed: {
			editSaveUrl() {
				return `/alumni/hash/${this.hash}`;
			},
			subSaveUrl() {
				return `/alumni/subscription/${this.hash}`;
			}
		},

		methods: {
			reloadAlum() {
				fetch(`/alumni/hash/${this.hash}`, {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(alum => {
					this.alum = alum;
					this.alerts.push({
						type: 'success',
						text: 'Profile information saved successfully!'
					});
				}).catch(err => {
					handleError(err, this, 'There was a problem reloading the alum data');
				});
			},
			reloadEditAlum() {
				this.show.edit = false;
				this.reloadAlum();
			}
		},

		components: {
			EditAlumni: () => import('@/vue-components/Alumni/Edit.vue'),
			AlumniSubscription: () => import('@/vue-components/Alumni/Subscription.vue')
		}
	});
}
