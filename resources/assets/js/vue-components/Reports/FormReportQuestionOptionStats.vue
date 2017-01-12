<template>
	<table v-if="responses || percentage || averagePercentage"
			class="table table-bordered">
		<tbody>
			<tr v-if="responses != null">
				<th>Responses</th>
				<td>{{ responses }}</td>
			</tr>
			<tr v-if="percentage != null">
				<th>Percentage</th>
				<td>{{ percentage }}%</td>
			</tr>
			<tr v-if="averagePercentage != null">
				<th>Average</th>
				<td>{{ averagePercentage }}%</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: {
		responses: Number,
		percentage: Number,
		averagePercentage: Number
	}
};
</script>

<style scoped>
	table {
		width: 40%;
		margin: 0 auto;
	}

	table td {
		text-align: center;
	}
</style>
