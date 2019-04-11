<template>
	<div class="reports-yearly-overview">
		<table class="table table-striped table-bordered">
			<thead>
				<tr>
					<th></th>
					<th v-for="year of yearKeys" :key="year">
						{{ yearLabel(year) }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Total reports</th>
					<td v-for="year of yearKeys" :key="year">
						{{ yearReports.get(year).length }}
					</td>
				</tr>
			</tbody>
		</table>

		<div class="charts-container">
			<grants-yearly-overview :reports="yearReports" :years="yearKeys" />

			<publications-yearly-overview :reports="yearReports" :years="yearKeys" />

			<studies-yearly-overview :reports="yearReports" :years="yearKeys" />
		</div>
	</div>
</template>

<style scoped>
.charts-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
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
			publicationsBreakdown: 'publicationType',
		};
	},
	computed: {
		yearKeys() {
			const starts = Array.from(new Set(this.reports.map(r => r.period_start)).values());
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
		}
	},
	methods: {
		yearLabel
	},
	components: {
		GrantsYearlyOverview,
		PublicationsYearlyOverview,
		StudiesYearlyOverview
	}
};
</script>
