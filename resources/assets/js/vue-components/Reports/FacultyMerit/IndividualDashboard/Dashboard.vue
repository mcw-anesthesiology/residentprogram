<template>
	<section class="individual-dashboard">
		<loading-placeholder v-if="$apollo.loading" />
		<div class="container body-block" v-else-if="user">
			<header>
				<h1>
					{{ title }}
					<rich-date-range :dates="dates" />
				</h1>

				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<td>{{ user.full_name }}</td>
						</tr>
						<tr
							v-for="[name, val] of Array.from(
								userProps.entries()
							)"
							:key="name"
						>
							<th>{{ name }}</th>
							<td>{{ val }}</td>
						</tr>
					</tbody>
				</table>
			</header>

			<div class="dashboard-container">
				<dashboard-compensation :user="user" :periods="periods" />
				<academic-productivity :user="user" :periods="periods" />
				<leadership-professional-citizenship
					:user="user"
					:periods="periods"
				/>
				<dashboard-goals :user="user" :periods="periods" />
			</div>
		</div>

		<dashboard-appendix v-if="includeAppendix" :user="user" :periods="periods" />

		<aside class="dashboard-controls body-block">
			<print-element-button
				target=".individual-dashboard"
				:filename="printFilename"
				:options="printOptions"
			>
				Print
			</print-element-button>

			<label>
				<input type="checkbox" v-model="includeAppendix" />
				Include appendix
			</label>
		</aside>
	</section>
</template>

<script>
/** @format */

import moment from 'moment';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';
import RichDateRange from '#/RichDateRange.vue';
import PrintElementButton from '#/PrintElementButton.vue';

import DashboardCompensation from './Compensation.vue';
import AcademicProductivity from './AcademicProductivity.vue';
import LeadershipProfessionalCitizenship from './LeadershipProfessionalCitizenship.vue';
import DashboardGoals from './Goals.vue';
import DashboardAppendix from './Appendix.vue';

import { renderYearRange, academicYearForDate } from '@/modules/date-utils.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		dates: {
			type: Object,
			required: true
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
			includeAppendix: true,
			printOptions: {
				landscape: true,
				printBackground: true
			}
		};
	},
	computed: {
		printFilename() {
			const userPortion = this.user ? ` - ${this.user.full_name}` : '';

			return `${this.title}${userPortion} - ${renderYearRange(
				this.dates.startDate,
				this.dates.endDate
			)}.pdf`;
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
		DashboardGoals,
		DashboardAppendix
	}
};
</script>

<style scoped>
header {
	display: flex;
	justify-content: space-between;
}

header h1 {
	flex-grow: 10;
	flex-shrink: 0;
}

.individual-dashboard {
	-webkit-print-color-adjust: exact;
}

.dashboard-container::after {
	content: '';
	display: table;
	clear: both;
}

header table {
	font-size: 1.25em;
	margin: 0;
	margin-left: 1em;
}

tr:first-child > * {
	padding-top: 0;
}

th,
td {
	padding: 0.25em;
}

.dashboard-controls {
	max-width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
}

.dashboard-controls > * {
	margin: 0.25em;
}

@media print {
	.body-block {
		padding: 0 !important;
		margin: 0 !important;
	}

	.individual-dashboard {
		padding: 0 !important;
		margin: 0 !important;
		font-size: 0.75em;
	}

	.dashboard-controls {
		display: none;
	}
}
</style>

<style>
.individual-dashboard h1,
.individual-dashboard h2,
.individual-dashboard h3,
.individual-dashboard h4,
.individual-dashboard h5 {
	margin-top: 0;
}

.dashboard-container > * {
	width: 50%;
}

.dashboard-container > :nth-child(odd) {
	clear: left;
	float: left;
}

.dashboard-container > :nth-child(even) {
	clear: right;
	float: right;
}
</style>
