import gql from 'graphql-tag';

import AlertList from '@/vue-components/AlertList.vue';
import ComponentList from '@/vue-components/ComponentList.vue';

import { handleError } from '@/modules/errors.js';
import { isoDateStringObject } from '@/modules/date-utils.js';
import { getCurrentYearlyMeritDateRange } from '@/modules/merit-utils.js';
import {
	getFetchHeaders,
	jsonOrThrow,
	isAdmin,
	usesFeature,
	groupUsers
} from '@/modules/utils.js';

const USERS_QUERY = gql`
	query AdminSupervisorMeritUsers {
		users(status: ACTIVE, type: FACULTY) {
			id
			first_name
			last_name
			full_name
			type
			training_level
			status
			meritReports {
				id
			}
		}
	}
`;

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		meritReportTypes: {
			type: Object,
			required: true
		},
		meritReportTypeForms: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			usersWithReports: null,
			users: [],

			userToCreateReport: null,
			createDates: isoDateStringObject(getCurrentYearlyMeritDateRange())
		};
	},
	apollo: {
		users: {
			query: USERS_QUERY
		}
	},

	computed: {
		currentUserIsAdminOrSupervisor() {
			return isAdmin(this.user) || usesFeature(this.user, 'FACULTY_MERIT');
		},
		usersWithoutReports() {
			return this.users.filter(u => u.meritReports.length === 0);
		},
		usersWithoutReportsOptions() {
			return groupUsers(this.usersWithoutReports);
		}
	},

	methods: {
		fetchUsersWithReports() {
			if (!this.currentUserIsAdminOrSupervisor)
				return;

			fetch('/merits/by-user', {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(usersWithReports => {
				this.usersWithReports = usersWithReports;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching users with reports');
			});
		},
		createUserReport(event) {
			event.preventDefault();

			if (
				!this.userToCreateReport
				|| !this.facultyMeritChecklistForm
			) {
				return;
			}

			this.$apollo.mutate({
				mutation: gql`
					mutation CreateUserMeritChecklist(
						$user_id: ID!
						$form_id: ID!
						$period_start: Date!
						$period_end: Date!
					) {
						createUserMerit(
							user_id: $user_id
							form_id: $form_id
							period_start: $period_start
							period_end: $period_end
							status: PENDING
						) {
							id
							user_id
						}
					}
				`,
				variables: {
					user_id: this.userToCreateReport,
					form_id: this.facultyMeritChecklistForm.id,
					period_start: this.createDates.startDate,
					period_end: this.createDates.endDate
				},
				update(store, { data: { createUserMerit: { user_id } } }) {
					const query = USERS_QUERY;
					const data = store.readQuery({ query });
					data.users = data.users.filter(u => u.id !== user_id);
					store.writeQuery({ query, data });
				}
			}).then(() => {
				this.userToCreateReport = null;
				this.fetchUsersWithReports();
			}).catch(err => {
				handleError(err, this, 'There was a problem creating the checklist');
			});
		}
	},

	components: {
		AlertList,
		ComponentList,
		UserWithMeritReportListItem: () => import('#/MeritCompensation/UserWithReportListItem.vue'),
		AcademicYearSelector: () => import('#/AcademicYearSelector.vue'),
		SelectTwo: () => import('#/SelectTwo.vue')
	}
};
