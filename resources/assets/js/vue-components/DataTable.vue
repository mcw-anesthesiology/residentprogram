<template>
	<div class="table-responsive">
		<div class="refresh-button-container" v-if="config && 'ajax' in config">
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
		<div v-if="exportable && data" class="text-center">
			<button type="button" class="btn btn-default"
					@click="exportCsv">
				Export CSV
			</button>
		</div>
	</div>
</template>

<script>
import download from 'downloadjs';

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
		
		exportable: {
			type: Boolean,
			default: false
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
			$(this.$refs.table).DataTable({
				retrieve: true
			}).ajax.reload(null, false);
		},
		exportCsv(){
			let header = [];
			header.fill([], this.thead.length);
			this.thead.map((row, rowIndex) => {
				if(!header[rowIndex])
					header[rowIndex] = [];

				row.map((cell, cellIndex) => {
					while(header[rowIndex][cellIndex])
						cellIndex++;

					if(cell.rowspan){
						for(let i = 0; i < cell.rowspan; i++){
							if(!header[rowIndex + i])
								header[rowIndex + i] = [];
							
							header[rowIndex + i][cellIndex] = cell.text;
							if(cell.colspan){
								for(let j = 0; j < cell.colspan; j++){
									header[rowIndex][cellIndex + j] = cell.text;
								}
							}
						}
					}
					else if(cell.colspan){
						for(let j = 0; j < cell.colspan; j++){
							header[rowIndex][cellIndex + j] = cell.text;
						}
					}
					else {
						header[rowIndex][cellIndex] = cell.text;
					}
				});
			});
			
			let rows = this.data.map(row =>
				row.map(cell =>
					typeof cell === 'string' ? `"${cell}"` : cell
				).join(',')).sort();
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
</style>
