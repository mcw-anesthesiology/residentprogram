<template>
	<table :id="id" class="table table-striped table-bordered" width="100%">
		<thead>
			<tr v-for="(row, rowIndex) of thead" :key="`row-${rowIndex}`">
				<th v-for="(th, thIndex) of row" :key="thIndex"
						:rowspan="th.rowspan"
						:colspan="th.colspan">
					{{ th.text }}
				</th>
			</tr>
		</thead>
	</table>
</template>

<script>
export default {
	props: [
		'id',
		'thead',
		'config',
		'data'
	],
	mounted(){
		$(`#${this.id}`).DataTable(Object.assign({}, this.config, {data: this.data}));
	},
	beforeUpdate(){
		$(`#${this.id}`).DataTable({
			retrieve: true
		}).clear().destroy();
	},
	updated(){
		$(`#${this.id}`).DataTable(Object.assign({}, this.config, {data: this.data}));
	},
	destroyed(){
		$(`#${this.id}`).DataTable({
			retrieve: true
		}).clear().destroy();
	}
}
</script>
