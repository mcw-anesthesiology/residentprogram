<template>
	<div>
		<input type="search" class="form-control" v-model="query" />
		<ol>
			<li v-for="user of currentPageItems">
				<input type="checkbox" :value="user.id" v-model="selectedUsers" />
				<a :href="`/profile/${user.id}`">{{ user.full_name }}</a>
				{{ user.subject_evaluations.length }}
				<button type="button" class="btn btn-xs">
					Send reminder
				</button>
			</li>
		</ol>

	</div>
</template>

<script>
import ComponentList from '../../ComponentList.vue';

export default {
	extends: ComponentList,
	data(){
		return {
			selectedUsers: []
		};
	},
	computed: {
		sortedItems(){
			let selectedItems = [];
			let nonSelectedItems = [];
			this.filteredItems.map(item => {
				if(this.selectedUsers.includes(item.id))
					selectedItems.push(item);
				else
					nonSelectedItems.push(item);
			});

			return selectedItems.concat(nonSelectedItems);
		}
	}
};
</script>

<style>

</style>
