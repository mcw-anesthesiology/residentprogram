<template>
	<section
		class="individual-merit-dashboard-section individual-merit-dashboard-academic-productivity"
	>
		<div class="report-container">
			<academic-productivity
				:reports="user.meritReports"
				:show-chart="show.chart"
				:show-breakdowns="show.breakdowns"
				:show-total="show.total"
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
			<label :readonly="!show.breakdowns">
				<input
					type="checkbox"
					v-model="show.total"
					:disabled="!show.breakdowns"
				/>
				Show total
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
				chart: false,
				breakdowns: true,
				total: false
			}
		};
	},

	components: {
		AcademicProductivity
	}
};
</script>
