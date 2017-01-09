<template>
	<section class="paginator">
		<span>
			Current page: {{ value + 1 }}
		</span>
		<span>
			Items per page: {{ itemsPerPage }}
		</span>
		<nav v-if="itemsPerPage && paginatedItems.length > 1">
			<paginator-link :value="value - 1" text="← Prev"
				:active="value === 0" @click="setPage" />

			<paginator-link v-for="(pageItems, pageNum) of paginatedItems"
				:value="pageNum" :active="pageNum === value"
				@click="setPage" />

			<paginator-link :value="value + 1" text="Next →"
				:active="value === paginatedItems.length - 1"
				@click="setPage" />
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
