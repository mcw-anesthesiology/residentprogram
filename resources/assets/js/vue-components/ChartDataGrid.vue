<template>
	<ag-grid-vue :grid-options="gridOptions"
		:columnDefs="columnDefs"
		:rowData="rowData"
	/>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default {
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	computed: {
		gridOptions() {
			return {

			};
		},
		columnDefs() {
			return [{
				headerName: '',
				field: 'label'
			}].concat(this.data.labels.map((label, index) => ({
				headerName: label,
				field: index.toString()
			})));
		},
		rowData() {
			return this.data.datasets.map(({ label, data }) => {
				const row = {
					label
				};

				data.forEach((val, index) => {
					row[index] = val;
				});

				return row;
			});
		}
	},
	components: {
		AgGridVue
	}
};
</script>
