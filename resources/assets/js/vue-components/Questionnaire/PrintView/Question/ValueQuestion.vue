<template>
	<tr>
		<th>{{ text }}</th>
		<td>{{ value }}</td>
	</tr>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true
		},
		value: {
			type: String,
			default: ''
		}
	}
};
</script>

<style scoped>
	th, td {
		padding: 0.5em;
	}

	th {
		padding-left: 1em;
	}

	@media (min-width: 768px) {
		th {
			padding-left: 5em;
		}
	}

	@media (min-width: 1200px) {
		th {
			padding-left: 30vw;
		}
	}
</style>
