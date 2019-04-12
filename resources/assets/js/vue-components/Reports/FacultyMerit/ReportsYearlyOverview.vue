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
      <grants-yearly-overview :reports="yearReports" :format-key="yearLabel"/>

      <publications-yearly-overview :reports="yearReports" :format-key="yearLabel"/>

      <studies-yearly-overview :reports="yearReports" :format-key="yearLabel"/>
    </div>
  </div>
</template>

<style scoped>
.reports-yearly-overview :global(td) {
	font-family: monospace;
}

.reports-yearly-overview :global(td),
.reports-yearly-overview :global(th:not(:first-child)) {
	text-align: right;
}

.status-row {
	color: rgba(0, 0, 0, 0.55);
}

.status-row th {
	padding-left: 2em;
}

.charts-container > :global(section) {
	box-sizing: border-box;
	margin: 1em;
	padding: 1em;
	border: 1px solid #ddd;
	border-radius: 2px;
}

.charts-container :global(canvas) {
	margin: 1em 0;
}
</style>

<script>
/** @format */

import GrantsYearlyOverview from './GrantsYearlyOverview.vue';
import PublicationsYearlyOverview from './PublicationsYearlyOverview.vue';
import StudiesYearlyOverview from './StudiesYearlyOverview.vue';

import { ucfirst } from '@/modules/text-utils.js';

function yearLabel(key) {
	return new Date(key.substring(0, key.indexOf(':'))).getFullYear();
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
				new Set(
					this.reports.map(r => `${r.period_start}:${r.period_end}`)
				).values()
			);
			starts.sort();

			return starts;
		},
		yearReports() {
			const map = new Map();

			for (const key of this.yearKeys) {
				map.set(key, []);
			}

			for (const r of this.reports) {
				map.get(`${r.period_start}:${r.period_end}`).push(r);
			}

			return map;
		},
		statusReports() {
			const map = new Map();

			const statuses = Array.from(
				new Set(this.reports.map(r => r.status)).values()
			);
			statuses.sort();

			for (const status of statuses) {
				const statusMap = new Map();

				for (const [year, reports] of this.yearReports.entries()) {
					statusMap.set(
						year,
						reports.filter(r => r.status === status)
					);
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
