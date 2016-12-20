<template>
	<nav class="paginator">
		<span>
			Current page: {{ value + 1 }}
		</span>
		<span>
			Items per page: {{ itemsPerPage }}
		</span>
		<nav v-if="itemsPerPage && paginatedItems.length > 1">
			<template v-for="(pageItems, pageNum) of paginatedItems">
				<a href="#" v-if="pageNum !== value" @click="setPage(pageNum, $event)">
					{{ pageNum + 1 }}
				</a>
				<span v-else>
					{{ pageNum + 1 }}
				</span>
			</template>
		</nav>
	</nav>
</template>

<script>
export default {
	props: {
		value: Number,
		itemsPerPage: Number,
		paginatedItems: Array
	},
	methods: {
		setPage(page, event){
			event.preventDefault();
			this.$emit('input', page);
		}
	}
};
</script>
