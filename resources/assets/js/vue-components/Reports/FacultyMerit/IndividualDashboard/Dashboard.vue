<template>
	<section class="individual-dashboard">
		<loading-placeholder v-if="$apollo.loading" />
		<template v-else-if="user">
			<header>
				<h1>
					{{ title }}
					<rich-date-range :dates="dates" />
				</h1>

				<dl>
					<dt>Name</dt>
					<dd>{{ user.full_name }}</dd>
					<template v-for="[name, val] of Array.from(userProps.entries())">
						<dt :key="`${name}:name`">{{ name }}</dt>
						<dd :key="`${name}:val`">{{ val }}</dd>
					</template>
				</dl>
			</header>


			<div class="dashboard-container">
				<dashboard-compensation :user="user" :periods="periods" />
				<academic-productivity :user="user" :periods="periods" />
				<leadership-professional-citizenship :user="user" :periods="periods" />
				<dashboard-goals :user="user" :periods="periods" />
			</div>
		</template>

		<div class="text-center noprint">
			<print-element-button target=".individual-dashboard"
				:filename="printFilename"
				:options="printOptions">
				Print
			</print-element-button>
		</div>
	</section>
</template>

<style scoped>
header {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.individual-dashboard {
	-webkit-print-color-adjust: exact;
}

.individual-dashboard :global(h1),
.individual-dashboard :global(h2),
.individual-dashboard :global(h3),
.individual-dashboard :global(h4),
.individual-dashboard :global(h5) {
	margin-top: 0;
}

.dashboard-container > :global(*) {
	width: 50%;
}

.dashboard-container > :global(:nth-child(odd)) {
	clear: left;
	float: left;
}

.dashboard-container > :global(:nth-child(even)) {
	clear: right;
	float: right;
}

.dashboard-container::after {
	content: '';
	display: table;
	clear: both;
}

dl {
	display: flex;
	flex-wrap: wrap;
	margin: 0;
	font-size: 1.25em;
}

dt, dd {
	flex-basis: 50%;
}

@supports (display: grid) {
	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0.5em;
	}
}

@media print {
	.individual-dashboard {
		font-size: 0.75em;
	}

	.dashboard-container {
		height: 100%;
		width: 100%;
	}
}
</style>

<script>
/** @format */

import gql from 'graphql-tag';
import moment from 'moment';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import RichDateRange from '#/RichDateRange.vue';
import PrintElementButton from '#/PrintElementButton.vue';

import DashboardCompensation from './Compensation.vue';
import AcademicProductivity from './AcademicProductivity.vue';
import LeadershipProfessionalCitizenship from './LeadershipProfessionalCitizenship.vue';
import DashboardGoals from './Goals.vue';

import { renderYearRange, academicYearForDate } from '@/modules/date-utils.js';
import { INDIVIDUAL_DASHBOARD_FIELDS } from '@/graphql/merit.js';

export default {
	props: {
		userId: {
			type: [String, Number],
			required: true
		},
		dates: {
			type: Object,
			required: true
		},
		includeIncomplete: {
			type: Boolean
		},
		title: {
			type: String,
			default: 'Individual dashboard'
		},
		role: {
			type: String
		},
		userProps: {
			type: Map,
			default() {
				return new Map();
			}
		}
	},
	data() {
		return {
			user: null,
			printOptions: {
				landscape: true,
				printBackground: true
			}
		};
	},
	apollo: {
		user: {
			query: gql`
				query IndividualDashboardUser(
					$userId: ID!
					$startDate: Date
					$endDate: Date
					$status: MeritReportStatus
				) {
					user(id: $userId) {
						id
						full_name
						meritReports(
							after: $startDate
							before: $endDate
							status: $status
						) {
							...IndividualDashboardFields
						}
					}
				}
				${INDIVIDUAL_DASHBOARD_FIELDS}
			`,
			variables() {
				return {
					userId: this.userId,
					...this.dates,
					status: this.includeIncomplete ? undefined : 'COMPLETE'
				};
			}
		}
	},
	computed: {
		printFilename() {
			const userPortion = this.user
				? ` - ${this.user.full_name}`
				: '';

			return `${this.title}${userPortion} - ${renderYearRange(this.dates.startDate, this.dates.endDate)}.pdf`;
		},
		periods() {
			const periods = new Set();

			const end = moment(this.dates.endDate);

			let d = moment(this.dates.startDate);
			while (d < end) {
				const year = academicYearForDate(d);
				periods.add(year);
				d = moment(year.endDate).add(1, 'day');
			}

			return periods;
		}
	},
	components: {
		LoadingPlaceholder,
		RichDateRange,
		PrintElementButton,
		DashboardCompensation,
		AcademicProductivity,
		LeadershipProfessionalCitizenship,
		DashboardGoals
	}
};
</script>
