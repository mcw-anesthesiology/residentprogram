<template>
	<div class="container body-block" v-if="meritReport">
		<merit-report
			v-bind="meritReport"
			:title="title"
			:user="user"
			:form-id="meritReport.form.id"
			@close="handleClose"
			@reload="$emit('reload')"
			@alert="$emit('alert', arguments[0])" />
	</div>
</template>

<script>
import MeritReport from './Report.vue';

import { getFetchHeaders, jsonOrThrow } from 'modules/utils.js';

export default {
	props: {
		id: {
			type: [ Number, String ],
			required: true
		},
		meritReports: {
			type: Array,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},

	data() {
		return {
			fetchedReports: null
		};
	},

	computed: {
		reports() {
			return this.meritReports || this.fetchedReports;
		},
		meritReport() {
			let id = Number(this.id);
			if (Number.isNaN(id) || !this.reports)
				return;

			return this.reports.find(report => report.id === id);
		}
	},

	mounted() {
		if (
			!this.meritReports
			|| !Array.isArray(this.meritReports)
			|| this.meritReports.length === 0
		) {
			this.fetchReports();
		}
	},

	methods: {
		fetchReports() {
			let query = $.param({
				with: {
					form: true
				}
			});

			fetch(`/merits?${query}`, {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(merits => {
				this.fetchedReports = merits;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching past merit reports'
				});
			});
		},
		handleClose() {
			this.$router.push({path: '/'});
		}
	},

	components: {
		MeritReport
	}
};
</script>
