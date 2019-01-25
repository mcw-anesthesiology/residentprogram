<template>
	<div class="container body-block">
		<p v-if="$apollo.loading">
			Loading...
		</p>
		<template v-else-if="user">
			<h2>{{ user.full_name }}</h2>

			<div v-if="user.roles.length">
				<h3>Roles</h3>
				<ul>
					<li v-for="role of user.roles">
						{{ role.role }}
						<pre v-if="role.pivot.additional_permissions">{{ JSON.stringify(role.pivot.additional_permissions) }}</pre>
					</li>
				</ul>
			</div>
		</template>
		<bootstrap-alert v-else type="warning">
			<p>Sorry, no user found.</p>
		</bootstrap-alert>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import { MANAGE_USER_FIELDS } from '@/graphql/user.js';

export default {
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			user: null
		};
	},
	apollo: {
		user: {
			query: gql`
				query ManageUser($id: ID!) {
					user(id: $id) {
						...ManageUserFields
					}
				}
				${MANAGE_USER_FIELDS}
			`,
			variables() {
				return {
					id: this.id
				};
			}
		}
	},
	components: {
		BootstrapAlert: () => import('#/BootstrapAlert.vue')
	}
};
</script>
