<template>
	<table class="table table-bordered">
		<tbody>
			<tr>
				<th>Responses</th>
				<td>{{ responses }}</td>
			</tr>
			<tr>
				<th>Percentage</th>
				<td>{{ percentage }}%</td>
			</tr>
			<tr>
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
