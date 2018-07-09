<template>
	<div class="table-responsive">
		<div class="refresh-button-container" v-if="canReload">
			<button type="button" class="btn btn-default" title="Reload table"
					@click="reloadTable">
				<span class="glyphicon glyphicon-refresh"></span>
			</button>
		</div>

		<table :id="id" class="table" :class="tableClass" width="100%" ref="table">
			<slot>
				<thead>
					<tr v-for="(row, rowIndex) of thead" :key="`row-${rowIndex}`">
						<th v-for="(th, thIndex) of row" :key="thIndex"
								:rowspan="th.rowspan"
								:colspan="th.colspan">
							{{ th.text || th }}
						</th>
					</tr>
				</thead>
			</slot>
		</table>
		<div v-if="exportable && data && data.length > 0" class="text-center">
			<button type="button" class="btn btn-default"
					@click="exportCsv">
				Export CSV
			</button>
		</div>
	</div>
</template>

<script>
import download from 'downloadjs';

import { csvHeader } from '@/modules/report-utils.js';
import { escapeCsv, sortIgnoreCase } from '@/modules/utils.js';

export default {
	props: {
		id: {
			type: String,
			required: false
		},
		striped: {
			type: Boolean,
			default: true
		},
		bordered: {
			type: Boolean,
			default: false
		},

		thead: {
			type: Array,
			required: false
		},
		config: {
			type: Object,
			required: false
		},
		data: {
			type: Array,
			required: false
		},

		reloadable: {
			type: Boolean,
			default: false
		},
		exportable: {
			type: Boolean,
			default: false
		},
		sortExport: {
			type: Boolean,
			default: true
		},
		exportFilename: {
			type: String,
			default(){
				return `Table Export ${new Date().toLocaleString()}`;
			}
		}
	},
	data(){
		return {
			updateData: false
		};
	},
	mounted(){
		$(this.$refs.table).DataTable(Object.assign({}, this.config, {data: this.data}));
	},
	computed: {
		tableClass(){
			return {
				'table-striped': this.striped,
				'table-bordered': this.bordered
			};
		},
		canReload(){
			return (this.config && 'ajax' in this.config) || this.reloadable;
		}
	},
	watch: {
		config(){
			let config = Object.assign({destroy: true}, this.config, {data: this.data});
			$(this.$refs.table).DataTable(config);
		},
		data(data){
			this.updateData = true;
			this.$nextTick(() => {
				// only set data if table not already recreated with new data
				if(this.updateData){
					$(this.$refs.table).DataTable({
						retrieve: true
					}).clear().rows.add(data).draw();
					this.updateData = false;
				}
			});
		}
	},
	methods: {
		reloadTable(){
			if (!this.canReload)
				return;

			if (this.config && 'ajax' in this.config)
				$(this.$refs.table).DataTable({
					retrieve: true
				}).ajax.reload(null, false);
			else
				this.$emit('reload');
		},
		exportCsv(){
			if (!this.exportable)
				return;

			let header = csvHeader(this.thead);
			let rows = this.data.map(row =>
				row.map(cell =>
					escapeCsv(cell.toString())
				).join(',')
			);

			if (this.sortExport)
				rows = rows.sort(sortIgnoreCase);

			let table = header.concat(rows);
			download(table.join('\n'), `${this.exportFilename}.csv`, 'text/csv');
		}
	},
	beforeUpdate(){
		$(this.$refs.table).DataTable({
			retrieve: true
		}).clear().destroy();
		this.updateData = false;
	},
	updated(){
		$(this.$refs.table).DataTable(Object.assign({}, this.config, {data: this.data}));
	},
	beforeDestroy(){
		$(this.$refs.table).DataTable({
			retrieve: true
		}).clear().destroy();
	}
};
</script>

<style scoped>
	.refresh-button-container {
		text-align: right;
	}

	@media print {
		.refresh-button-container {
			display: none;
		}
	}
</style>
