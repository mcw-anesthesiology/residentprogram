import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import ComponentList from 'vue-components/ComponentList.vue';
import UserWithMeritReportListItem from 'vue-components/MeritCompensation/UserWithReportListItem.vue';

import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';

export default function createAdminSupervisorMeritReports(el, propsData) {
	return new Vue({
		el,
		props: {
			user: {
				type: Object,
				required: true
			},
			meritReportTypes: {
				type: Object,
				required: true
			},
			meritReportTypeForms: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				usersWithReports: null,
				meritForms: null,

				alerts: []
			};
		},
		propsData,

		mounted() {
			this.fetchUsersWithReports();
			this.fetchMeritForms();
		},

		computed: {

		},

		methods: {
			fetchUsersWithReports() {
				fetch('/merits/by-user', {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(usersWithReports => {
					this.usersWithReports = usersWithReports;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching users with reports'
					});
				});
			},
			fetchMeritForms() {
				fetch('/merit-forms', {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(meritForms => {
					this.meritForms = meritForms;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching merit forms'
					});
				});
			},
		},

		components: {
			AlertList,
			ComponentList,
			UserWithMeritReportListItem
		}
	});
}
