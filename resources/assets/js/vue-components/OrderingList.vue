<template>
	<div class="row">
		<div class="col-md-6">
			<ul class="list-group">
				<li v-for="item of itemsRemaining" class="list-group-item"
						@click="addItem(item)">
					<slot v-bind="item">
						{{ item }}
					</slot>
				</li>
			</ul>
		</div>
		<div class="col-md-6">
			<ol class="list-group">
				<li v-for="(item, index) of value" class="list-group-item"
						@click="removeItem(index)">
					<slot v-bind="item">
						{{ item }}
					</slot>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Array,
			required: true,
			default(){
				return [];
			}
		},
		items: {
			type: Array,
			required: true
		}
	},
	
	computed: {
		itemsRemaining(){
			return this.items.filter(item => !this.value.includes(item));
		}
	},
	
	methods: {
		addItem(item){
			this.$emit('input', this.value.concat(item));
		},
		removeItem(index){
			let value = this.value.slice();
			value.splice(index, 1);
			this.$emit('input', value);
		}
	}
};
</script>

<style scoped>
	.list-group-item {
		cursor: pointer;
	}
</style>
