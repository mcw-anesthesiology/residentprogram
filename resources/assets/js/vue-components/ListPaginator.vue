<template>
	<section class="paginator">
		<div class="form-inline">
			<div class="form-group">
				<label class="containing-label">
					Current page:
					<input type="number" class="form-control" :value="value"
						@input="$emit('input', Number($event.target.value))" />
				</label>
			</div>
			<div class="form-group">
				<label class="containing-label">
					Items per page: 
					<input type="number" class="form-control" list="paginator-list"
						min="0" :value="itemsPerPage"
						@input="$emit('pageSize', Number($event.target.value))" />
					<datalist id="paginator-list">
						<option value="5" />
						<option value="10" />
						<option value="20" />
						<option value="50" />
						<option value="100" />
					</datalist>
				</label>
			</div>			
		</div>
		<nav v-if="itemsPerPage && paginatedItems.length > 1">
			<div class="btn-group">
				<paginator-link :value="value - 1" text="← Prev"
					:active="value === 0" @click="setPage" />

				<paginator-link v-for="(pageItems, pageNum) of paginatedItems"
					:value="pageNum" :active="pageNum === value"
					@click="setPage" />

				<paginator-link :value="value + 1" text="Next →"
					:active="value === paginatedItems.length - 1"
					@click="setPage" />
			</div>
		</nav>
	</section>
</template>

<script>
import PaginatorLink from './PaginatorLink.vue';

export default {
	props: {
		value: Number,
		itemsPerPage: Number,
		paginatedItems: Array
	},
	methods: {
		setPage(page){
			this.$emit('input', page);
		}
	},
	components: {
		PaginatorLink
	}
};
</script>

<style scoped>
	.paginator {
		text-align: center;
	}

	nav span {
		margin: 0 0.25em;
	}
</style>
