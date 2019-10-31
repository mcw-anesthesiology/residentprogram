<template>
	<div class="user-group-item">
		<h2>{{ group.name }}</h2>

		<div class="item-body">
			<ul class="list-group">
				<li v-for="user of group.users" :key="user.id" class="list-group-item">
					{{ user.full_name }}

					<confirmation-button
						class="btn btn-xs btn-danger"
						pressed-class="btn btn-xs btn-warning"
						@click="removeUser(user.id)"
					>
						<span class="glyphicon glyphicon-remove"></span>
					</confirmation-button>
				</li>
			</ul>

			<form v-if="show.addUser" @submit="handleAddUser">
				<label class="containing-label">
					User
					<user-select v-model="newUserId" :filter="filterUserOptions" />
				</label>

				<button type="submit" class="btn btn-primary">
					Add user
				</button>

				<button type="button" class="btn btn-default" @click="show.addUser = false">
					Cancel
				</button>
			</form>
			<button v-else type="button" class="btn btn-success" @click="show.addUser = true">
				Add user
			</button>
		</div>
	</div>
</template>

<style scoped>
.user-group-item {
	padding: 2em;
	margin: 2em;
	border: 1px solid #ccc;
}

h2 {
	font-size: 1.5em;
}

.item-body {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
}
</style>

<script>
import gql from 'graphql-tag';

import ConfirmationButton from '#/ConfirmationButton.vue';
import UserSelect from '#/UserSelect.vue';

import { USER_GROUPS_QUERY, USER_GROUP_FIELDS } from '@/graphql/user.js';

export default {
	props: {
		group: Object
	},
	data() {
		return {
			newUserId: '',
			show: {
				addUser: false
			}
		};
	},
	computed: {
		userIds() {
			const ids = new Set(this.group.users.map(u => u.id));

			return ids;
		}
	},
	methods: {
		filterUserOptions(optGroups) {
			const newGroups = {};
			for ([key, group] of Object.entries(optGroups)) {
				newGroups[key] = {
					...group,
					children: group.children.filter(option => !this.userIds.has(option.id))
				};
			}

			return newGroups;
		},
		async handleAddUser() {
			if (!this.newUserId) return;

			await this.$apollo.mutate({
				mutation: gql`
					mutation ($groupId: ID!, $userId: ID!) {
						addUserToGroup(
							group_id: $groupId
							user_id: $userId
						) {
							...UserGroupFields
						}
					}
					${USER_GROUP_FIELDS}
				`,
				variables: {
					groupId: this.group.id,
					userId: this.newUserId
				},
				update(store, { data: { addUserToGroup } }) {
					const data = store.readQuery({ query: USER_GROUPS_QUERY });
					const index = data.userGroups.find(g => g.id === addUserToGroup.id);
					data.userGroups.splice(index, 1, addUserToGroup);
					store.writeQuery({ query: USER_GROUPS_QUERY, data });
				}
			});
			this.newUserId = '';
		},
		async removeUser(userId) {
			if (!userId) return;

			await this.$apollo.mutate({
				mutation: gql`
					mutation ($groupId: ID!, $userId: ID!) {
						removeUserFromGroup(
							group_id: $groupId
							user_id: $userId
						) {
							id
						}
					}
				`,
				variables: {
					groupId: this.group.id,
					userId
				},
				update(store) {
					const data = store.readQuery({ query: USER_GROUPS_QUERY });
					const index = data.userGroups.find(g => g.id === this.group.id);
					data.userGroups[index].users.filter(u => u.id !== userId);
					store.writeQuery({ query: USER_GROUPS_QUERY, data });
				}
			});
		}
	},
	components: {
		ConfirmationButton,
		UserSelect
	}
};
</script>
