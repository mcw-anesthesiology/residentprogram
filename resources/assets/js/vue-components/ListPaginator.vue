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
				<paginator-link v-for="pageNum of pageLinkButtons"
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
		text-align: center;
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

	nav span {
		margin: 0 0.25em;
	}

	.btn-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	@supports (display: grid) {

		nav {
			display: grid;
			grid-gap: 1em;
		}

		@media (min-width: 500px) {
			nav {
				grid-template-columns: 6em 1fr 6em;
			}
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
	computed: {
		pageLinkButtons() {
			if (this.paginatedItems.length <= 10)
				return Array(this.paginatedItems.length).fill().map((_, i) => i);

			let buttons = [0, 1, 2, 3, 4];
			for (let i = this.paginatedItems.length - 5; i < this.paginatedItems.length; i++) {
				buttons.push(i);
			}

			let buttonsAdded = false;
			if (!buttons.includes(this.value)) {
				buttons.push(this.value);
				buttonsAdded = true;
			}

			if (this.value > 0 && !buttons.includes(this.value - 1)) {
				buttons.push(this.value - 1);
				buttonsAdded = true;
			}

			if (this.value < this.paginatedItems.length - 1 && !buttons.includes(this.value + 1)) {
				buttons.push(this.value + 1);
				buttonsAdded = true;
			}

			if (buttonsAdded) {
				buttons = Array.from(new Set(buttons).values());
				buttons.sort((a, b) => Number(a) - Number(b));
			}

			return buttons;
		}
	},
	components: {
		PaginatorLink
	}
};
</script>

