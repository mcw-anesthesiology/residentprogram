<template>
	<div>
		<div v-if="selectedUserGroup" class="container body-block">
			<h2>{{ renderUserType(selectedUserGroup.type) }}</h2>

			<user-list :users="selectedUserGroup.users" />
		</div>
		<template v-else>
			<div v-for="{ type, users } of userTypeGroups" class="container body-block">
				<h2>{{ renderUserType(type) }}</h2>

				<user-list :users="users" />
			</div>
		</template>

		<user-groups />
	</div>
</template>

<script>
import gql from 'graphql-tag';

import UserGroups from '../UserGroups/UserGroups.vue';

import { renderUserType } from '@/modules/user-utils.js';

import { MANAGE_USER_LIST_FIELDS } from '@/graphql/user.js';

export default {
	data() {
		return {
			userTypeGroups: []
		};
	},
	apollo: {
		userTypeGroups: {
			query: gql`
				query ManageUsers {
					userTypeGroups {
						type
						users {
							...ManageUserListFields
						}
					}
				}
				${MANAGE_USER_LIST_FIELDS}
			`
		}
	},
	computed: {
		selectedUserGroup() {
			if (!this.$route.hash)
				return;

			const type = this.$route.hash.substring(1).toUpperCase();

			return this.userTypeGroups.find(ug => ug.type === type);
		}
	},
	methods: {
		renderUserType
	},
	components: {
		UserList: () => import('./UserList.vue'),
		UserGroups
	}
};
</script>
