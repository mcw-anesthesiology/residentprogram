<template>
	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th></th>
				<th v-for="label of data.labels" :key="label">
					{{ label }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="{ label, data } of data.datasets" :key="label">
				<th>{{ label }}</th>
				<td v-for="(val, index) of data" :key="index">
					{{ valueFormatter(val) }}
				</td>
			</tr>
		</tbody>
		<tfoot v-if="footDatasets">
			<tr v-for="{ label, data } of footDatasets" :key="label">
				<th>{{ label }}</th>
				<td v-for="(val, index) of data" :key="index">
					{{ valueFormatter(val) }}
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<style>
tfoot {
	border-top: 2px solid #ddd;
}
</style>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		},
		footDatasets: {
			type: Array,
			required: false
		},
		valueFormatter: {
			type: Function,
			default: a => a
		}
	}
};
</script>
