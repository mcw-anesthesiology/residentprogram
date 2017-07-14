import Vue from 'vue';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import ComponentList from 'vue-components/ComponentList.vue';

import CaseLogs from 'vue-components/CaseLog/CaseLogs.vue';

import {
	getFetchHeaders,
	jsonOrThrow,
	userIsType
} from 'modules/utils.js';

export function createCaseLog(el, propsData) {
	return new Vue({
		mixins: [
			HasAlerts
		],
		el,
		props: {
			user: {
				type: Object,
				required: true
			},
			detailsSchema: {
				type: Object,
				required: true
			},
			locations: {
				type: Array,
				required: true
			}
		},
		propsData,
		data() {
			return {
				caseLogs: [],
				show: {
					charts: false
				}
			};
		},

		computed: {
			isAdmin() {
				return userIsType(this.user, 'admin');
			},
			caseLogFields() {
				return [
					'full_name'
				];
			},
			groupedCaseLogs() {
				if (!this.caseLogs || this.caseLogs.length < 1)
					return [];

				let groupedCaseLogs = new Map();

				for (let caseLog of this.caseLogs) {
					let user = groupedCaseLogs.get(caseLog.user.id);
					if (!user) {
						user = Object.assign(caseLog.user);
						user.caseLogs = [];
					}
					user.caseLogs.push(caseLog);
					groupedCaseLogs.set(user.id, user);
				}

				return Array.from(groupedCaseLogs.values());
			}
		},

		mounted() {
			this.fetchCaseLogs();
		},

		methods: {
			fetchCaseLogs() {
				let query = $.param({
					with: {
						location: ['name'],
						user: ['full_name'],
						detailsSchema: true
					}
				});

				fetch(`/case_logs?${query}`, {
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(caseLogs => {
					this.caseLogs = caseLogs;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching case logs'
					});
				});
			},
			removeCaseLog(id) {
				this.caseLogs = this.caseLogs.filter(caseLog =>
					caseLog.id !== id
				);
			}
		},

		components: {
			ComponentList,
			CaseLogs
		}
	});
}
