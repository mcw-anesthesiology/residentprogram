<template>
	<div class="component-list-item merit-administrator-list-item">
		<h3>{{ user.full_name }}</h3>

		<form @submit="handleSave">

			<label class="containing-label">
				Administratees
				<v-select :options="facultyOptions" v-model="meritAdministratees" multiple
				/>
			</label>

			<button v-if="administrateesChanged"
				type="submit"
				class="btn btn-primary"
			>
				Save
			</button>
		</form>
	</div>
</template>

<style scoped>
	.merit-administrator-list-item {
		display: flex;
		padding: 1em;
		align-items: flex-start;
	}

	h3, form {
		flex: 1 1;
	}

	h3 {
		margin: 0;
	}

	form {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-end;
	}

	label {
		flex-basis: 80%;
	}
</style>

<script>
import gql from 'graphql-tag';

import { MERIT_ADMINISTRATOR_STAFF_FIELDS } from '@/graphql/merit.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		facultyUsers: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			meritAdministratees: this.user.meritAdministratees.map(u => ({
				value: u.id,
				label: u.full_name
			})),
			administrateesChanged: false
		};
	},
	computed: {
		facultyOptions() {
			return this.facultyUsers.map(u => ({
				value: u.id,
				label: u.full_name
			}));
		}
	},
	watch: {
		user(user) {
			this.meritAdministratees = user.meritAdministratees.map(u => ({
				value: u.id,
				label: u.full_name
			}));
			this.$nextTick(() => {
				this.administrateesChanged = false;
			});
		},
		meritAdministratees() {
			this.administrateesChanged = true;
		}
	},
	methods: {
		resetAdministratees() {

		},
		handleSave(event) {
			event.preventDefault();

			const administratee_ids = this.meritAdministratees.map(({ value }) => value);

			this.$apollo.mutate({
				mutation: gql`
					mutation SetMeritAdministratees(
						$user_id: ID!
						$administratee_ids: [ID!]!
					) {
						setUserMeritAdministratees(
							user_id: $user_id,
							administratee_ids: $administratee_ids
						) {
							...MeritAdministratorsStaffFields
						}
					}
					${MERIT_ADMINISTRATOR_STAFF_FIELDS}
				`,
				variables: {
					user_id: this.user.id,
					administratee_ids
				}
			});
		}
	},
	components: {
		VSelect: () => import('vue-select')
	}
};
</script>
