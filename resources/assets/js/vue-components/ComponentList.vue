<template>
	<div>
		<div class="list-header form-inline">
			<select class="form-control" v-model="sortBy">
				<option v-for="field of fields" :value="field">
					{{ snakeCaseToWords(field) }}
				</option>
			</select>
			<button type="button" class="btn btn-default"
					@click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'">
				<span v-if="sortOrder === 'asc'"
					class="glyphicon glyphicon-sort-by-alphabet"></span>
				<span v-else
					class="glyphicon glyphicon-sort-by-alphabet-alt"></span>
			</button>
			<input type="search" class="form-control" v-model="query"
				placeholder="Search" />
		</div>
		<ol class="list">
			<slot v-for="item of currentPageItems" v-bind="item"></slot>
		</ol>
		<list-paginator v-model="page" :paginatedItems="paginatedItems"
			:itemsPerPage="itemsPerPage"
			@pageSize="itemsPerPage = arguments[0]" />
	</div>
</template>

<script>
import ListPaginator from './ListPaginator.vue';

import lunr from 'lunr';

import { snakeCaseToWords } from 'modules/utils.js';
import { sortFunctions } from 'modules/report-utils.js';

export default {
	props: {
		fields: {
			type: Array,
			default(){
				return [];
			}
		},
		items: {
			type: Array,
			required: true
		},
		fieldAccessors: {
			type: Object,
			required: false
		}
	},
	data(){
		return {
			query: null,
			page: 0,
			itemsPerPage: 10,
			sortBy: this.fields[0],
			sortOrder: 'asc'
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
				if (this.fieldAccessors) {
					for (let field in this.fieldAccessors) {
						item[field] = this.fieldAccessors[field](item);
					}
				}
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
			if(this.sortBy && this.sortOrder){
				
				let sortedItems = sortFunctions.has(this.sortBy)
					? this.filteredItems.sort(sortFunctions.get(this.sortBy))
					: this.filteredItems.sort((a, b) => {
						let aValue;
						let bValue;
						
						if (this.fieldAccessors && this.sortBy in this.fieldAccessors) {
							aValue = this.fieldAccessors[this.sortBy](a);
							bValue = this.fieldAccessors[this.sortBy](b);
						} else {
							aValue = a[this.sortBy];
							bValue = b[this.sortBy];
						}
						
						if (Number.isNaN(aValue))
							aValue = aValue.toUpperCase();
						
						if (Number.isNaN(bValue))
							bValue = bValue.toUpperCase();
						
						if(aValue < bValue)
							return -1;
						if(aValue > bValue)
							return 1;
						return 0;
					});
				
				return this.sortOrder === 'asc'
					? sortedItems
					: sortedItems.reverse();
			}
			
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
	methods: {
		snakeCaseToWords
	},
	components: {
		ListPaginator
	}
};
</script>

<style scoped>
	.list-header {
		text-align: right;
	}

	.list-header input[type="search"] {
		width: 300px;
	}
	
	.list {
		padding: 0;
	}

	.list li {
		list-style: none;
	}
</style>
