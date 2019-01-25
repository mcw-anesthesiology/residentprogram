<template>
	<component-list :items="users" :fields="fields">
		<template slot-scope="user">
			<user-list-item :user="user" />
		</template>
	</component-list>
</template>

<script>
import ComponentList from '#/ComponentList.vue';

export default {
	props: {
		users: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			fields: [
				'id',
				'full_name',
			]
		};
	},
	components: {
		ComponentList,
		UserListItem: () => import('./UserListItem.vue')
	}
};
</script>
