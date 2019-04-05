<template>
	<div>
		<div>
			<label>
				Breakdown
				<select v-model="grantsBreakdown">
					<option value=""></option>
					<option value="agency">Agency</option>
					<option value="type">Type</option>
				</select>
			</label>

			<label>
				Unit
				<select v-model="grantsUnit">
					<option>#</option>
					<option>$</option>
				</select>
			</label>
			<yearly-grants-chart :reports="reports" :breakdown="grantsBreakdown" :unit="grantsUnit" />
		</div>
	</div>
</template>

<script>
import YearlyGrantsChart from './YearlyGrantsChart.js';

export default {
	props: {
		reports: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			grantsBreakdown: null,
			grantsUnit: '#'
		};
	},
	components: {
		YearlyGrantsChart
	}
};
</script>
