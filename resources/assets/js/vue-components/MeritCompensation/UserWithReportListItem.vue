<template>
	<div class="user-with-report-list-item">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-2">
						<h3>{{ full_name }}</h3>
					</div>
					<div class="col-sm-10">
						<component-list :fields="meritReportFields" :items="merit_reports"
								:field-accessors="meritReportFieldAccessors"
								:paginate="false"
								default-sort-order="desc">
							<template slot-scope="item">
								<merit-report-list-item v-bind="item"
									:user="user"
									@click="handleReportClick"
									@summary="handleViewSummary"
									@change="$emit('change')" />
							</template>
						</component-list>
					</div>
				</div>

				<alert-list v-model="alerts" />
			</div>
		</div>
	</div>
</template>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ComponentList from '@/vue-components/ComponentList.vue';
import MeritReportListItem from './ReportListItem.vue';

export default {
	mixins: [
		HasAlerts
	],
	props: {
		full_name: {
			type: String,
			required: true
		},
		merit_reports: {
			type: Array,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},
	data() {
		return {
			viewedReport: null,
			viewedReportSummary: null,
			saving: false,
			savingSuccessful: false
		};
	},

	computed: {
		meritReportFields() {
			return [
				'id',
				'form_name'
			];
		},
		meritReportFieldAccessors() {
			return {
				'form_name': meritReport => meritReport.form.name
			};
		}
	},

	watch: {
		merit_reports(meritReports) {
			if (this.viewedReport)
				this.viewedReport = meritReports.find(meritReport =>
					meritReport.id === this.viewedReport.id);

			if (this.viewedReportSummary)
				this.viewedReportSummary = meritReports.find(meritReport =>
					meritReport.id === this.viewedReportSummary.id
				);
		}
	},

	methods: {
		handleReportClick(reportId) {
			this.$emit('view-report', reportId);
		},
		handleViewSummary(reportId) {
			this.$emit('view-summary', reportId);
		}
	},

	components: {
		ComponentList,
		MeritReportListItem
	}
};
</script>
