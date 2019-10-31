<template>
	<div>
		<div class="group-list">
			<user-group-item v-for="group of userGroups" :key="group.id"
				:group="group"
			/>
		</div>

		<form v-if="show.add" @submit="handleCreate">
			<label class="containing-label">
				Name
				<input type="text" class="form-control" v-model="newGroupName" />
			</label>

			<button type="submit" class="btn btn-primary btn-lg">
				Create group
			</button>
		</form>
		<button v-else type="button" class="btn btn-success" @click="show.add = true">
			Create group
		</button>
	</div>
</template>

<style scoped>
.group-list >>> .user-group-item:nth-child(even) {
	background-color: #dedede;
}
</style>

<script>
import gql from 'graphql-tag';

import UserGroupItem from './UserGroupItem.vue';

import { USER_GROUP_FIELDS, USER_GROUPS_QUERY } from '@/graphql/user.js';


export default {
	data() {
		return {
			userGroups: [],

			newGroupName: '',
			show: {
				add: false
			}
		};
	},
	apollo: {
		userGroups: {
			query: USER_GROUPS_QUERY
		}
	},
	methods: {
		async handleCreate() {
			await this.$apollo.mutate({
				mutation: gql`
					mutation CreateUserGroup($name: String!) {
						createUserGroup(name: $name) {
							...UserGroupFields
						}
					}
					${USER_GROUP_FIELDS}
				`,
				variables: {
					name: this.newGroupName
				},
				update(store, { data: { createUserGroup } }) {
					const data = store.readQuery({ query: USER_GROUPS_QUERY });
					data.userGroups.push(createUserGroup);
					store.writeQuery({ query: USER_GROUPS_QUERY, data });
				}
			});
			this.show.add = false;
		}
	},
	components: {
		UserGroupItem
	}
};
</script>
