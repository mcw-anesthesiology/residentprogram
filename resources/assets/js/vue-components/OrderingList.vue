<template>
	<div class="row">
		<div class="col-md-6">
			<b>Unordered items</b>
			<ul class="list-group">
				<li v-for="item of itemsRemaining" class="list-group-item"
						:key="itemKey in item && `bank-${item[itemKey]}`"
						@click="addItem(item)">
					<slot v-bind="item">
						{{ item }}
					</slot>
				</li>
			</ul>
		</div>
		<div class="col-md-6">
			<b>Ordered list</b>
			<ol class="list-group" ref="orderedList">
				<li v-for="(item, index) of value" class="list-group-item"
						:class="{active: activeItem === index}"
						:key="itemKey in item && item[itemKey]"
						@click="removeItem(index)">
					<slot v-bind="item">
						{{ item }}
					</slot>
					<div class="item-controls">
						<input type="number" class="form-control"
							:value="index + 1" @click="$event.stopPropagation()"
							@change="moveItemTo($event, index)" />
						<div class="item-controls-buttons">
							<button type="button" class="btn btn-default"
									v-if="index > 0"
									@click="moveItemUp($event, index)">
								<span class="glyphicon glyphicon-arrow-up"></span>
							</button>
							<button type="button" class="btn btn-default"
									v-if="index < value.length - 1"
									@click="moveItemDown($event, index)">
								<span class="glyphicon glyphicon-arrow-down"></span>
							</button>
						</div>
					</div>
				</li>
			</ol>
			<div v-if="value.length > 0" class="text-center">
				<button type="button" class="btn btn-warning"
						@click="$emit('input', [])">
					Clear list
				</button>
			</div>
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
		},
		itemKey: {
			type: String,
			default: 'id'
		}
	},
	
	data(){
		return {
			activeItem: null,
			activeItemTimeoutId: null
		};
	},
	
	computed: {
		itemsRemaining(){
			return this.items.filter(item => !this.value.includes(item));
		}
	},
	watch: {
		activeItem(){
			if(this.activeItemTimeoutId)
				window.clearTimeout(this.activeItemTimeoutId);
			
			this.activeItemTimeoutId = window.setTimeout(() => {
				if(this.activeItemTimeoutId){
					this.activeItem = null;
					this.activeItemTimeoutId = null;
				}
			}, 1000);
		}
	},
	
	methods: {
		addItem(item){
			this.$emit('input', this.value.concat(item));
		},
		removeItem(index){
			if(event.defaultPrevented)
				return;
			
			let value = this.value.slice();
			value.splice(index, 1);
			this.$emit('input', value);
		},
		moveItemTo(event, index){
			let newIndex = event.target.value - 1;
			
			if(newIndex < 0 || newIndex > this.value.length - 1)
				return;
			
			let value = this.value.slice();
			value.splice(newIndex, 0, value.splice(index, 1)[0]);
			
			this.activeItem = newIndex;
			this.$emit('input', value);
		},
		moveItemUp(event, index){
			event.preventDefault();
			event.stopPropagation();

			if(index === 0)
				return;
				
			let newIndex = index - 1;
			let value = this.value.slice();
			
			value.splice(newIndex, 0, value.splice(index, 1)[0]);
			
			this.activeItem = newIndex;
			this.$emit('input', value);
		},
		moveItemDown(event, index){
			event.preventDefault();
			event.stopPropagation();
			
			if(index === this.value.length - 1)
				return;
			
			let newIndex = index + 1;
			let value = this.value.slice();
			
			value.splice(newIndex, 0, value.splice(index, 1)[0]);
			
			this.activeItem = newIndex;
			this.$emit('input', value);
		}
	}
};
</script>

<style scoped>
	.list-group-item {
		cursor: pointer;
	}
	
	.list-group-item:focus,
	.list-group-item:hover {
		color: #555;
		background-color: #f5f5f5;
	}
	
	.list-group-item.active:focus,
	.list-group-item.active:hover {
		color: white;
		background-color: rgba(51, 123, 184, 0.85);
	}
	
	.item-controls {
		margin-top: 1em;
		display: flex;
		justify-content: space-between;
	}
	
	.item-controls .form-control {
		width: 5em;
	}
	
	.item-controls-buttons {
		
	}
</style>
