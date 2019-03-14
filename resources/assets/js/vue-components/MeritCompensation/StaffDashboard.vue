<template>
	<div class="container body-block">
		<h2>Supervisee merit reports</h2>

		<loading-placeholder v-if="$apollo.loading" />
		<div v-else-if="me">
			<component-list :fields="['full_name']"
				:items="me.meritAdministratees"
				:paginate="false"
				reloadable
				@reload="handleReload"
			>
				<template slot-scope="reportUser">
					<user-with-merit-report-list-item :key="reportUser.id"
						v-bind="reportUser"
						:user="user"
					/>
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import ComponentList from '#/ComponentList.vue';
import LoadingPlaceholder from '#/LoadingPlaceholder.vue';

import { MERIT_REPORT_LIST_FIELDS } from '@/graphql/merit.js';

export default {
	props: {
		user: {
			type: Object
		}
	},
	data() {
		return {
			me: null
		};
	},
	apollo: {
		me: {
			query: gql`
				query StaffMeritDashboard {
					me {
						id
						meritAdministratees {
							id
							full_name
							meritReports {
								...MeritReportListFields
							}
						}
					}
				}
				${MERIT_REPORT_LIST_FIELDS}
			`
		}
	},
	methods: {
		handleReload() {
			this.$apollo.queries.me.refetch();
		}
	},
	components: {
		LoadingPlaceholder,
		ComponentList,
		UserWithMeritReportListItem: () => import('#/MeritCompensation/UserWithReportListItem.vue'),
	}
};
</script>
