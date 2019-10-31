<template>
	<button type="button" class="btn btn-default" @click="handleClick">
		<slot></slot>
	</button>
</template>

<script>
/** @format */

import XLSX from 'xlsx';

export default {
	props: {
		table: {
			type: HTMLTableElement,
			required: true
		},
		filename: {
			type: String,
			default: 'export'
		},
		extension: {
			type: String,
			default: 'xlsx'
		}
	},
	methods: {
		handleClick() {
			const wb = XLSX.utils.table_to_book(this.table);
			XLSX.writeFile(wb, `${this.filename}.${this.extension}`);
		}
	}
};
</script>
