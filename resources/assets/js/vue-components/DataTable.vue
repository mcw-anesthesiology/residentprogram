<template>
	<div ref="container">
		<table :id="id" class="table" :class="tableClass" width="100%" ref="table">
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
	</div>
</template>

<script>
import ElementResizeDetector from 'element-resize-detector';

const erd = ElementResizeDetector({
	strategy: 'scroll'
});

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
			default: true
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
		}
	},
	data(){
		return {
			updateData: false
		};
	},
	mounted(){
		$(this.$refs.table).DataTable(Object.assign({}, this.config, {data: this.data}));

		erd.listenTo(this.$refs.container, () => {
			$(window).trigger('resize');
		});
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
