<template>
	<div>
		<input type="search" class="form-control" v-model="query" />
		<ol class="list">
			<slot v-for="item of currentPageItems" v-bind="item"></slot>
		</ol>
		<list-paginator v-model="page" :itemsPerPage="itemsPerPage"
			:paginatedItems="paginatedItems"
			@changePageSize="itemsPerPage = arguments[0]" />
	</div>
</template>

<script>
import ListPaginator from './ListPaginator.vue';

import lunr from 'lunr';


export default {
	props: {
		fields: Array,
		items: Array
	},
	data(){
		return {
			query: '',
			page: 0,
			itemsPerPage: 20
		};
	},
	computed: {
		itemMap(){
			let map = new Map();
			this.items.map(item => {
				map.set(item.id, item);
			});

			return map;
		},
		index(){
			let fields = this.fields;

			let index = lunr(function(){
				fields.map(field => {
					let name, options;
					if(typeof field === 'string'){
						name = field;
					}
					else{
						name = field.name;
						options = field;
					}
					this.field(name, options);
				});
			});

			this.items.map(item => {
				index.add(item);
			});

			return index;
		},
		filteredItems(){
			if(this.query){
				let refs = this.index.search(this.query);
				return refs.map(ref => {
					return this.itemMap.get(ref.ref);
				});
			}

			return this.items;
		},
		sortedItems(){
			return this.filteredItems;
		},
		paginatedItems(){
			let paginatedItems = [];
			let items = this.sortedItems.slice();
			while(items.length > 0)
				paginatedItems.push(items.splice(0, this.itemsPerPage));

			return paginatedItems;
		},
		currentPageItems(){
			return this.paginatedItems[this.page];
		}
	},

	components: {
		ListPaginator
	}
};
</script>

<style scoped>
	.list li {
		list-style: none;
	}
</style>
