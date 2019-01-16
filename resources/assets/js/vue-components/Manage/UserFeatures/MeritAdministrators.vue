<template>
	<div class="container body-block">
		<h2>Merit administrators</h2>

		<component-list :items="staffUsers" :fields="['full_name']">
			<template slot-scope="staffUser">
				<merit-administrator-list-item :user="staffUser" :facultyUsers="facultyUsers" />
			</template>
		</component-list>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import { MERIT_ADMINISTRATOR_STAFF_FIELDS } from '@/graphql/merit.js';

export default {
	data() {
		return {
			staffUsers: [],
			facultyUsers: []
		};
	},
	apollo: {
		staffUsers: {
			query: gql`
				query MeritAdministratorsStaffQuery {
					users(type: STAFF) {
						...MeritAdministratorsStaffFields
					}
				}
				${MERIT_ADMINISTRATOR_STAFF_FIELDS}
			`,
			update({ users }) {
				return users;
			}
		},
		facultyUsers: {
			query: gql`
				query MeritAdministratorsFacultyQuery {
					users(type: FACULTY) {
						id
						full_name
					}
				}
			`,
			update({ users }) {
				return users;
			}
		}
	},
	components: {
		ComponentList: () => import('#/ComponentList.vue'),
		MeritAdministratorListItem: () => import('./MeritAdministratorListItem.vue')
	}
};
</script>
