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
								:paginate="false">
							<template scope="item">
								<merit-report-list-item v-bind="item"
									@click="handleReportClick" />
							</template>
						</component-list>
					</div>
				</div>
				<div v-if="viewedReport" class="row">
					<merit-report v-bind="viewedReport" @close="handleReportClose" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ComponentList from 'vue-components/ComponentList.vue';
import MeritReportListItem from './ReportListItem.vue';
import MeritReport from './Report.vue';

export default {
	props: {
		full_name: {
			type: String,
			required: true
		},

		merit_reports: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			viewedReport: null
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

	methods: {
		handleReportClick(reportId) {
			this.viewedReport = this.merit_reports.find(meritReport =>
				meritReport.id === reportId);
		},
		handleReportClose() {
			this.viewedReport = null;
		}
	},

	components: {
		ComponentList,
		MeritReportListItem,
		MeritReport
	}
};
</script>
