<template>
	<div id="admin-supervisor-merit-reports-container">
		<div class="container body-block">
			<h2>Merit reports</h2>

			<form class="reports-filter-form">
				<label>
					Form
					<select class="form-control" v-model="formId">
						<option v-for="form of meritReportForms" :key="form.id" :value="form.id">
							{{ form.name }} - version {{ form.version }}
						</option>
					</select>
				</label>
				<label>
					Checklist period
					<academic-year-selector
						:min-date="FEATURE_RELEASE_DATES.FACULTY_MERIT"
						v-model="dates"
					/>
				</label>
			</form>

			<div v-if="usersWithReports">
				<component-list :fields="['full_name']"
					:items="usersWithReports"
					:paginate="false"
					reloadable
					@reload="handleReload"
				>
					<template slot-scope="reportUser">
						<user-with-merit-report-list-item v-bind="reportUser"
							:user="user"
							@change="handleChange"
							@close="handleClose"
						/>
					</template>
				</component-list>
			</div>
			<loading-placeholder v-else-if="$apollo.loading" />

			<alert-list v-model="alerts"></alert-list>
		</div>

		<div class="container body-block" v-if="selectedForm">
			<h2>Create checklist</h2>
			<form @submit="createUserReport">
				<div class="form-group">
					<label class="containing-label">
						Form
						<input type="text" class="form-control" :value="selectedForm.name" readonly />
					</label>
				</div>
				<div class="form-group">
					<label class="containing-label">
						Checklist period
						<div class="form-control readonly">
							<rich-date-range :dates="dates" />
						</div>
					</label>
				</div>
				<div class="form-group">
					<label class="containing-label">
						User
						<select-two v-model="userToCreateReport"
							:options="usersWithoutReportsOptions"
						/>
					</label>
				</div>

				<button type="submit" class="btn btn-primary"
					:disabled="!userToCreateReport"
				>
					Create report
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ComponentList from '#/ComponentList.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import RichDateRange from '#/RichDateRange.vue';

import { handleError } from '@/modules/errors.js';
import { isoDateStringObject, currentYear } from '@/modules/date-utils.js';
import { getCurrentYearlyMeritDateRange } from '@/modules/merit-utils.js';
import {
	isAdmin,
	usesFeature,
	groupUsers
} from '@/modules/utils.js';
import { FEATURE_RELEASE_DATES } from '@/modules/constants.js';
import { MERIT_REPORT_LIST_FIELDS } from '@/graphql/merit.js';

const USER_FIELDS = gql`
	fragment AdminSupervisorMeritUserFields on User {
		id
		first_name
		last_name
		full_name
		type
		training_level
		status
		meritReports(
			form_id: $formId
			after: $startDate
			before: $endDate
		) {
			...MeritReportListFields
		}
	}
	${MERIT_REPORT_LIST_FIELDS}
`;

const USERS_QUERY = gql`
	query AdminSupervisorMeritUsers(
		$formId: ID
		$startDate: Date
		$endDate: Date
	) {
		users(status: ACTIVE, type: FACULTY) {
			...AdminSupervisorMeritUserFields
		}
	}
	${USER_FIELDS}
`;

export default {
	mixins: [
		HasAlerts
	],
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			FEATURE_RELEASE_DATES,

			users: [],
			dates: isoDateStringObject(currentYear()),
			formId: null,
			meritReportForms: [],
			facultyMeritChecklistForm: null,

			userToCreateReport: null
		};
	},
	apollo: {
		users: {
			query: USERS_QUERY,
			variables() {
				return {
					...this.dates,
					formId: this.formId
				}
			}
		},
		forms: {
			query: gql`
				query {
					meritReportForms {
						id
						name
						version
					}
					facultyMeritChecklistForm {
						id
						name
					}
				}
			`,
			update({ meritReportForms, facultyMeritChecklistForm }) {
				this.meritReportForms = meritReportForms;
				this.facultyMeritChecklistForm = facultyMeritChecklistForm;
				this.formId = facultyMeritChecklistForm.id;
			}
		}
	},

	computed: {
		currentUserIsAdminOrSupervisor() {
			return isAdmin(this.user) || usesFeature(this.user, 'FACULTY_MERIT');
		},
		usersWithReports() {
			return this.users.filter(u => u.meritReports.length > 0);
		},
		usersWithoutReports() {
			return this.users.filter(u => u.meritReports.length === 0);
		},
		usersWithoutReportsOptions() {
			return groupUsers(this.usersWithoutReports);
		},
		selectedForm() {
			return this.meritReportForms.find(f => f.id == this.formId);
		}
	},

	methods: {
		createUserReport(event) {
			event.preventDefault();

			if (
				!this.userToCreateReport
				|| !this.formId
			) {
				return;
			}

			this.$apollo.mutate({
				mutation: gql`
					mutation CreateUserMeritChecklist(
						$userId: ID!
						$formId: ID!
						$startDate: Date!
						$endDate: Date!
					) {
						createUserMerit(
							user_id: $userId
							form_id: $formId
							period_start: $startDate
							period_end: $endDate
							status: PENDING
						) {
							id
							user_id
							user {
								...AdminSupervisorMeritUserFields
							}
						}
					}
					${USER_FIELDS}
				`,
				variables: {
					userId: this.userToCreateReport,
					formId: this.formId,
					...this.dates
				},
				update(store, { data: { createUserMerit: { user } } }) {
					const query = USERS_QUERY;
					const data = store.readQuery({ query });
					data.users = data.users.filter(u => u.id === user.id ? user : u);
					store.writeQuery({ query, data });
				}
			}).then(() => {
				this.userToCreateReport = null;
			}).catch(err => {
				handleError(err, this, 'There was a problem creating the checklist');
			});
		},
		handleReload() {
			this.$apollo.queries.users.refetch();
		},
		handleChange(id) {
			this.$apollo.query({
				query: gql`
					query RefetchMeritReport($id: ID!) {
						meritReport(id: $id) {
							...MeritReportListFields
						}
					}
					${MERIT_REPORT_LIST_FIELDS}
				`,
				variables: {
					id
				},
				fetchPolicy: 'network-only'
			});
		},
		handleClose() {
			this.$router.push({ path: '/' });
		}
	},

	components: {
		ComponentList,
		LoadingPlaceholder,
		RichDateRange,
		UserWithMeritReportListItem: () => import('#/MeritCompensation/UserWithReportListItem.vue'),
		AcademicYearSelector: () => import('#/AcademicYearSelector.vue'),
		SelectTwo: () => import('#/SelectTwo.vue')
	}
};
</script>

<style scoped>
.reports-filter-form {
	display: flex;
	justify-content: flex-end;
}
</style>
