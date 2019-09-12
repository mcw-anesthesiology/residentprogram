<template>
	<div class="container body-block">
		<h1>Mentors</h1>

		<component-list :items="faculty" :fields="fields" :paginate="false" default-sort-by="full_name">
			<template v-slot:default="user">
				<li class="mentor-item component-list-item">
					<span class="mentor-name">
						{{ user.full_name }}
					</span>

					<ul class="list-group">
						<li v-for="mentorship of user.mentorships" :key="mentorship.id" class="mentee-item list-group-item">
							<span class="mentee-name">
								{{ mentorship.mentee.full_name }}
							</span>
							<confirmation-button class="btn btn-xs btn-danger"
								@click="handleDeleteMentorship(mentorship.id)"
							>
								<span class="glyphicon glyphicon-remove"></span>
								Remove
							</confirmation-button>
						</li>
					</ul>

					<form v-if="showAdd[user.id]" @submit="handleAddMentee($event, user.id)">
						<label class="containing-label">
							Mentee
							<select-two :options="groupedTrainees" name="trainee" />
						</label>

						<button type="submit" class="btn btn-success">
							Add mentee
						</button>
						<button type="button" class="btn btn-default"
							@click="$set(showAdd, user.id, false)"
						>
							Close
						</button>
					</form>
					<button type="button" v-else class="btn btn-success"
						@click="$set(showAdd, user.id, true)"
					>
						Add mentee
					</button>
				</li>
			</template>
		</component-list>
	</div>
</template>

<style scoped>
.mentor-item {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
}

.mentor-name {
	flex-grow: 1;
	font-size: 1.25em;
	display: block;
	margin: 0.5em;
}

.mentee-name {
	display: inline-block;
	margin-right: 0.5em;
}

.list-group {
	margin: 0 1em;
}

.mentee-item button {
	float: right;
}

form {
	border: 1px solid #ccc;
	padding: 0.5em;
	border-radius: 2px;
}

form label {
	margin-bottom: 0.5em;
}

form button {
	margin: 0.25em;
}
</style>

<script>
import gql from 'graphql-tag';

import { groupUsers } from '@/modules/utils.js';
import { GROUP_USER_FIELDS } from '@/graphql/user.js';

import ComponentList from '#/ComponentList.vue';
import ConfirmationButton from '#/ConfirmationButton.vue';
import SelectTwo from '#/SelectTwo.vue';

const FACULTY_QUERY = gql`
	{
		faculty: users(type: FACULTY, status: ACTIVE) {
			id
			full_name
			mentorships {
				id
				mentee {
					id
					full_name
				}
			}
		},
	}
`;

export default {
	data() {
		return {
			faculty: [],
			trainees: [],
			fields: ['full_name'],
			showAdd: {}
		};
	},
	apollo: {
		faculty: {
			query: FACULTY_QUERY
		},
		trainees: {
			query: gql`
				{
					trainees: users(type: TRAINEE, status: ACTIVE) {
						...SelectTwoGroupFields
					}
				}
				${GROUP_USER_FIELDS}
			`
		}
	},
	computed: {
		groupedTrainees() {
			if (!this.trainees.length) return [];

			return groupUsers(this.trainees);
		}
	},
	methods: {
		handleAddMentee(event, mentorId) {
			event.preventDefault();
			const menteeId = event.target.elements.trainee.value;

			this.$apollo.mutate({
				mutation: gql`
					mutation ($mentorId: ID!, $menteeId: ID!) {
						createMentorship(mentor_id: $mentorId, mentee_id: $menteeId) {
							id
							mentee {
								id
								full_name
							}
						}
					}
				`,
				variables: {
					mentorId,
					menteeId
				},
				update(store, { data: { createMentorship } }) {
					const data = store.readQuery({ query: FACULTY_QUERY });
					const mentor = data.faculty.find(f => f.id === mentorId);
					if (mentor) {
						mentor.mentorships.push(createMentorship);
					}

					store.writeQuery({ query: FACULTY_QUERY, data });
				}
			});
		},
		handleDeleteMentorship(id) {
			this.$apollo.mutate({
				mutation: gql`
					mutation ($id: ID!) {
						deleteMentorship(id: $id) {
							id
							mentor_id
						}
					}
				`,
				variables: {
					id
				},

				update(store, { data: { deleteMentorship } }) {
					const data = store.readQuery({ query: FACULTY_QUERY });
					const mentor = data.faculty.find(f => f.id === deleteMentorship.mentor_id);
					if (mentor) {
						mentor.mentorships = mentor.mentorships.filter(m => m.id !== deleteMentorship.id);
					}

					store.writeQuery({ query: FACULTY_QUERY, data });
				}
			});
		}
	},
	components: {
		ComponentList,
		ConfirmationButton,
		SelectTwo
	}
};
</script>
