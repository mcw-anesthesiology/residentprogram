<template>
	<div>
		<div class="list-header-controls form-inline">
			<div class="form-group">
				<label class="containing-label">
					Sort
					<div class="input-group">
						<select class="form-control" v-model="sortBy">
							<option v-for="field of fields" :value="field">
								{{ renderFieldName(field) }}
							</option>
						</select>
						<span class="input-group-btn">
							<button type="button" class="btn btn-default"
									@click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'">
								<span v-if="sortOrder === 'asc'"
									class="glyphicon glyphicon-sort-by-alphabet"></span>
								<span v-else
									class="glyphicon glyphicon-sort-by-alphabet-alt"></span>
							</button>
						</span>
					</div>
				</label>
			</div>
			<div class="form-group">
				<label class="containing-label">
					Search
					<input type="search" class="form-control" v-model="query"
						placeholder="Search" />
				</label>
			</div>
			<div v-if="reloadable" class="form-group">
				<button type="button" class="btn btn-default labelless-button"
						@click="$emit('reload')">
					<span class="glyphicon glyphicon-refresh"></span>
				</button>
			</div>
		</div>
		<div class="list-container">
			<slot name="header"></slot>

			<ol v-if="itemsToShow" class="list">
				<slot v-for="item of currentPageItems" v-bind="item"></slot>
			</ol>
			<p v-else class="no-items-text">
				No items to show
			</p>

			<slot name="footer"></slot>
		</div>
		<list-paginator v-if="paginate"
			v-model="page" :paginatedItems="paginatedItems"
			:itemsPerPage="itemsPerPage"
			@pageSize="itemsPerPage = arguments[0]" />
	</div>
</template>

<script>
import ListPaginator from './ListPaginator.vue';

import lunr from 'lunr';

import { snakeCaseToWords } from '@/modules/utils.js';
import { sortFunctions } from '@/modules/report-utils.js';

export default {
	props: {
		searchRef: {
			type: String,
			required: false
		},
		fields: {
			type: Array,
			default() {
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
		},
		defaultSortBy: {
			type: String,
			required: false
		},
		defaultSortOrder: {
			type: String,
			validator(order) {
				return ['asc', 'desc'].includes(order);
			},
			default: 'asc'
		},
		paginate: {
			type: Boolean,
			default: true
		},
		reloadable: {
			type: Boolean,
			default: false
		},
		sortFunctions: {
			type: Map,
			default(){
				return sortFunctions;
			}
		}
	},
	data() {
		return {
			query: null,
			page: 0,
			itemsPerPage: 10,
			sortBy: this.defaultSortBy || this.fields[0],
			sortOrder: this.defaultSortOrder
		};
	},
	computed: {
		itemMap() {
			let map = new Map();
			this.items.map(item => {
				map.set(item.id, item);
			});

			return map;
		},
		index() {
			const vm = this;

			return lunr(function() {
				if (vm.searchRef)
					this.ref(vm.searchRef);

				for (const field of vm.fields) {
					let name, options;
					if (typeof field === 'string') {
						name = field;
					} else {
						name = field.name;
						options = field;
					}
					this.field(name, options);
				}

				for (const item of vm.items) {
					if (vm.fieldAccessors) {
						for (const field in vm.fieldAccessors) {
							item[field] = vm.fieldAccessors[field](item, 'search');
						}
					}
					this.add(item);
				}
			});
		},
		filteredItems() {
			if (this.query && this.index) {
				let refs = this.index.search(this.query);
				return refs.map(ref => {
					return this.itemMap.get(ref.ref);
				});
			}

			return this.items;
		},
		sortedItems() {
			if (this.sortBy && this.sortOrder) {

				return sortFunctions.has(this.sortBy)
					? this.filteredItems.sort(sortFunctions.get(this.sortBy))
					: this.filteredItems.sort((a, b) => {
						let aValue;
						let bValue;

						if (this.fieldAccessors && this.sortBy in this.fieldAccessors) {
							aValue = this.fieldAccessors[this.sortBy](a, 'sort');
							bValue = this.fieldAccessors[this.sortBy](b, 'sort');
						} else {
							aValue = a[this.sortBy];
							bValue = b[this.sortBy];
						}

						if (Number.isNaN(aValue))
							aValue = aValue.toUpperCase();

						if (Number.isNaN(bValue))
							bValue = bValue.toUpperCase();

						if (aValue < bValue)
							return this.sortOrder === 'asc'
								? -1
								: 1;
						if (aValue > bValue)
							return this.sortOrder === 'asc'
								? 1
								: -1;
						return 0;
					});
			}

			return this.filteredItems;
		},
		paginatedItems() {
			if (!this.paginate)
				return this.sortedItems;

			let paginatedItems = [];
			let items = this.sortedItems.slice();
			while(items.length > 0)
				paginatedItems.push(items.splice(0, this.itemsPerPage));

			return paginatedItems;
		},
		currentPageItems() {
			if (!this.paginate)
				return this.sortedItems;

			return this.paginatedItems[this.page];
		},
		itemsToShow() {
			return this.filteredItems && this.filteredItems.length > 0;
		}
	},
	methods: {
		renderFieldName(field) {
			if (field === 'id')
				return 'ID';

			return snakeCaseToWords(field);
		}
	},
	components: {
		ListPaginator
	}
};
</script>

<style scoped>
	.list-header-controls {
		text-align: right;
	}

	.list-header-controls input[type="search"] {
		width: 300px;
		max-width: 100%;
	}

	.list-header-controls.form-inline .input-group > .form-control {
		width: auto;
	}

	.list-container {
		margin: 3em 0;
	}

	.list {
		padding: 0;
	}

	.list li {
		list-style: none;
	}

	.containing-label {
		text-align: left;
	}

	.containing-label > * {
		display: block;
	}

	.no-items-text {
		padding: 0.5em 0;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-left: none;
		border-right: none;
		text-align: center;
		font-size: 1.25em;
	}
</style>
