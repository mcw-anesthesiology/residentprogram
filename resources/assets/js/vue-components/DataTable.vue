<template>
	<table :id="id" class="table table-striped table-bordered" width="100%">
		<thead>
			<tr v-for="(row, rowIndex) of thead" :key="`row-${rowIndex}`">
				<th v-for="(th, thIndex) of row" :key="thIndex"
						:rowspan="th.rowspan"
						:colspan="th.colspan">
					{{ th.text || th }}
				</th>
			</tr>
		</thead>
	</table>
</template>

<script>
import ElementResizeDetector from 'element-resize-detector';
import uniqueId from 'lodash/uniqueId';

const erd = ElementResizeDetector({
	strategy: 'scroll'
});

export default {
	props: {
		id: {
			type: String,
			default(){
				return `datatable-${uniqueId()}`;
			}
		},
		thead: {
			type: Array,
			required: true
		},
		config: {
			type: Object,
			required: false
		},
		data: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			updateData: false
		};
	},
	mounted(){
		$(`#${this.id}`).DataTable(Object.assign({}, this.config, {data: this.data}));

		let parent = document.querySelector(`#${this.id}`).parentElement;
		erd.listenTo(parent, () => {
			$(window).trigger('resize');
		});
	},
	watch: {
		config(){
			let config = Object.assign({destroy: true}, this.config, {data: this.data});
			$(`#${this.id}`).DataTable(config);
		},
		data(data){
			this.updateData = true;
			this.$nextTick(() => {
				// only set data if table not already recreated with new data
				if(this.updateData){
					let dt = $(`#${this.id}`).DataTable({
						retrieve: true
					}).clear().rows.add(data).draw();
					this.updateData = false;
				}
			});
		}
	},
	beforeUpdate(){
		$(`#${this.id}`).DataTable({
			retrieve: true
		}).clear().destroy();
		this.updateData = false;
	},
	updated(){
		$(`#${this.id}`).DataTable(Object.assign({}, this.config, {data: this.data}));
	},
	beforeDestroy(){
		$(`#${this.id}`).DataTable({
			retrieve: true
		}).clear().destroy();
	}
}
</script>
