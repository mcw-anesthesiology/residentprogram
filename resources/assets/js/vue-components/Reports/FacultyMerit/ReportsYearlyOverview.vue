<template>
  <div class="reports-yearly-overview">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th></th>
          <th v-for="year of yearKeys" :key="year">{{ yearLabel(year) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Total reports</th>
          <td v-for="year of yearKeys" :key="year">{{ yearReports.get(year).length }}</td>
        </tr>
		<template v-if="statusReports.size > 1">
			<tr v-for="[status, statusMap] of Array.from(statusReports.entries())" :key="status" class="status-row">
				<th>{{ ucfirst(status.toLowerCase()) }}</th>
				<td v-for="[year, reports] of Array.from(statusMap.entries())" :key="year">
					{{ reports.length }}
				</td>
			</tr>
		</template>
      </tbody>
    </table>

    <div class="charts-container">
      <grants-yearly-overview :reports="yearReports"/>

      <publications-yearly-overview :reports="yearReports"/>

      <studies-yearly-overview :reports="yearReports"/>
    </div>
  </div>
</template>

<style scoped>
.charts-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.status-row {
	color: rgba(0, 0, 0, 0.55);
}

.status-row th {
	padding-left: 2em;
}

@media (min-width: 1200px) {
	.charts-container > :global(section) {
		flex-basis: 500px;
		margin: 1em;
		min-width: 0;
		min-height: 0;
	}
}
</style>

<script>
import GrantsYearlyOverview from './GrantsYearlyOverview.vue';
import PublicationsYearlyOverview from './PublicationsYearlyOverview.vue';
import StudiesYearlyOverview from './StudiesYearlyOverview.vue';

import { ucfirst } from '@/modules/text-utils.js';

function yearLabel(date) {
	return new Date(date).getFullYear();
}

export default {
	props: {
		reports: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			publicationsBreakdown: 'publicationType'
		};
	},
	computed: {
		yearKeys() {
			const starts = Array.from(
				new Set(this.reports.map(r => r.period_start)).values()
			);
			starts.sort();

			return starts;
		},
		yearReports() {
			const map = new Map();

			for (const start of this.yearKeys) {
				map.set(start, []);
			}

			for (const report of this.reports) {
				map.get(report.period_start).push(report);
			}

			return map;
		},
		statusReports() {
			const map = new Map();

			const statuses = Array.from(new Set(this.reports.map(r => r.status)).values());
			statuses.sort();

			for (const status of statuses) {
				const statusMap = new Map();

				for (const [year, reports] of this.yearReports.entries()) {
					statusMap.set(year, reports.filter(r => r.status === status));
				}

				map.set(status, statusMap);
			}

			return map;
		}
	},
	methods: {
		yearLabel,
		ucfirst
	},
	components: {
		GrantsYearlyOverview,
		PublicationsYearlyOverview,
		StudiesYearlyOverview
	}
};
</script>
