<template>
	<div class="question-option-stats">
		<table v-if="responses || percentage || averagePercentage"
				class="table table-bordered">
			<tbody>
				<tr v-if="responses != null">
					<th>Subject responses</th>
					<td>{{ responses }}</td>
				</tr>
				<tr v-if="percentage != null">
					<th>Subject percentage</th>
					<td>{{ percentage }}%</td>
				</tr>
				<tr v-if="averagePercentage != null">
					<th>Overall percentage</th>
					<td>{{ averagePercentage }}%</td>
				</tr>
			</tbody>
		</table>
	</div>
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
	.question-option-stats {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: flex-end;
	}

	table {
		width: 40%;
		margin: 0 auto;
	}
	
	table th {
		white-space: nowrap;
	}

	table td {
		text-align: center;
	}
</style>
