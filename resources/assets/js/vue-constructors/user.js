import Vue from 'vue';
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import { handleError } from '@/modules/errors.js';
import { USER_SETTINGS, SETTINGS_HELP, getUserSetting } from '@/modules/user-utils.js';
import {
	camelCaseToWords,
	fetchConfig,
	jsonOrThrow,
	pluralize
} from '@/modules/utils.js';

export function createUserSettingsPage(el, propsData) {
	return new Vue({
		mixins: [HasAlerts],
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
				user_settings: this.user.user_settings
			};
		},
		computed: {
			USER_SETTINGS() {
				return USER_SETTINGS;
			},
			SETTINGS_HELP() {
				return SETTINGS_HELP;
			}
		},
		methods: {
			getUserSetting(setting) {
				return getUserSetting(this, setting);
			},
			displaySetting: camelCaseToWords,
			handleSettingsSubmit(event) {
				event.preventDefault();

				const data = new FormData(event.target);

				fetch(`/users/settings`, {
					...fetchConfig({contentType: null}),
					method: 'POST',
					body: data
				}).then(jsonOrThrow).then(saved => {
					const entries = Array.from(Object.entries(saved));
					const successful = entries
						.filter(([_, s]) => s)
						.map(([name, _]) => name);
					const unsuccessful = entries
						.filter(([_, s]) => !s)
						.map(([name, _]) => name);

					if (successful.length > 0) {
						const s = successful.length;
						this.alerts.push({
							type: 'success',
							text: `${s} ${pluralize('setting', s)} saved successfully`
						});

						const user_settings = this.user_settings;
						for (const name of successful) {
							const setting = {
								name,
								value: data.get(name)
							};
							const i = user_settings.findIndex(s => s.name === name);
							if (i === -1) {
								user_settings.push(setting);
							} else {
								user_settings.splice(i, 1, setting);
							}
						}
						this.user_settings = user_settings;
					}

					if (unsuccessful.length > 0) {
						const u = unsuccessful.length;
						this.alerts.push({
							type: 'error',
							html: `
								<p>${u} ${pluralize('setting', u)} not saved</p>
								<ul>
									${unsuccessful.map(name =>
										`<li>${this.displaySetting(name)}</li>`
									)}
								</ul>
							`
						});
					}
				}).catch(err => {
					handleError(err, this, 'There was a problem saving your settings');
				});
			}
		}
	});
}