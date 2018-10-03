<template>
	<section class="paginator">
		<div class="form-inline">
			<div class="form-group">
				<label class="containing-label">
					Current page:
					<input type="number" class="form-control" :value="value + 1"
						min="1" :max="paginatedItems.length"
						@input="$emit('input', Number($event.target.value) - 1)" />
				</label>
			</div>
			<div class="form-group">
				<label class="containing-label">
					Items per page:
					<select class="form-control" :value="itemsPerPage"
							@input="$emit('pageSize', Number($event.target.value))">
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</label>
			</div>
		</div>
		<nav v-if="itemsPerPage && paginatedItems.length > 1">
			<paginator-link :value="value - 1" text="← Prev"
				:active="value === 0" @click="setPage" />

			<div class="btn-group">
				<paginator-link v-for="(pageItems, pageNum) of paginatedItems"
					:key="pageNum"
					:value="pageNum"
					:active="pageNum === value"
					@click="setPage" />
			</div>

			<paginator-link :value="value + 1" text="Next →"
				:active="value === paginatedItems.length - 1"
				@click="setPage" />
		</nav>
	</section>
</template>

<style scoped>
	.paginator {
		padding: 1em;
	}

	.form-inline {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.form-inline > .form-group {
		margin: 1em;
	}

	nav {
		margin: 0.5em 0;
	}

	.btn-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	@supports (display: grid) {

		nav {
			display: grid;
			grid-template-columns: 6em 1fr 6em;
			grid-gap: 1em;
		}
	}
</style>

<script>
import PaginatorLink from './PaginatorLink.vue';

export default {
	props: {
		value: Number,
		itemsPerPage: Number,
		paginatedItems: Array
	},
	watch: {
		itemsPerPage(){
			if(this.value >= this.paginatedItems.length)
				this.setPage(this.paginatedItems.length - 1);
		}
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
