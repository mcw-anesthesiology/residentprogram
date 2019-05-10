<template>
	<section
		class="individual-merit-dashboard-section individual-merit-dashboard-academic-productivity"
	>
		<div class="report-container">
			<academic-productivity
				:reports="user.meritReports"
				:show-chart="show.chart"
				:show-breakdowns="show.breakdowns"
				:additional-breakdowns="additionalBreakdowns"
			/>
		</div>

		<form>
			<label>
				<input type="checkbox" v-model="show.chart" />
				Show chart
			</label>
			<label>
				<input type="checkbox" v-model="show.breakdowns" />
				Show yearly breakdown
			</label>
		</form>
	</section>
</template>

<style scoped>
form {
	display: flex;
	flex-wrap: wrap;
}

form label {
	margin: 0.5em;
}

@media print {
	form {
		display: none;
	}
}
</style>

<script>
/** @format */

import DashboardSection from './Section.vue';

import AcademicProductivity from '#/Reports/FacultyMerit/AcademicProductivity.vue';

export default {
	extends: DashboardSection,

	data() {
		return {
			show: {
				chart: true,
				breakdowns: true
			}
		};
	},

	computed: {
		additionalBreakdowns() {
			return new Map([
				[
					'Goals',
					[
						{
							publications: [
								...Array(3).fill({
									publicationType: 'Book / Text, First Ed.'
								})
							],
							grants: [
								...Array(1).fill({ type: 'EXISTING' }),
								...Array(1).fill({ type: 'NEW' })
							],
							studies: Array(2),
							leadershipPositions: 3
						}
					]
				]
			]);
		}
	},

	components: {
		AcademicProductivity
	}
};
</script>
