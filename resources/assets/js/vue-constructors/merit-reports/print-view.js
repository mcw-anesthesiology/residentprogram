import Vue from 'vue';

import ChecklistSection from 'vue-components/MeritCompensation/Checklist/Section.vue';

import RichDateRange from 'vue-components/RichDateRange.vue';

import { getCheckedItemCount } from 'modules/merit-utils.js';

export default function createMeritReportPrintView(el, propsData) {
	return new Vue({
		el,
		props: {
			meritReport: {
				type: Object,
				required: true
			},
			user: {
				type: Object,
				required: false
			}
		},
		propsData,

		computed: {
			dates() {
				return {
					startDate: this.meritReport.period_start,
					endDate: this.meritReport.period_end
				};
			},
			checkedItems() {
				return getCheckedItemCount(this.meritReport.report);
			}
		},

		components: {
			ChecklistSection,
			RichDateRange
		}
	});
}
