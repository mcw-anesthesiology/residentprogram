<template>
	<section class="individual-dashboard">
		<loading-placeholder v-if="$apollo.loading" />
		<div class="container body-block" v-else-if="user">
			<header>
				<h1>
					<small>
						<rich-date-range :dates="dates" />
						{{ title }}
					</small>
					{{ user.full_name }}
				</h1>

				<table>
					<tbody>
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

				<img alt="MCW Anesthesiology" src="/svg/MCW-Anesthesiology-white-on-green.svg" />
			</header>

			<div class="dashboard-container">
				<dashboard-compensation :user="user" :provider-info="providerInfo" :periods="periods" />
				<academic-productivity :user="user" :periods="periods" />
				<leadership-section
					:user="user"
					:periods="periods"
				/>
				<professional-citizenship
					:user="user"
					:periods="periods"
				/>
				<dashboard-goals :subtitle="`FY${fiscalYear + 1}`"
					:user="user"
					:periods="periods"
				/>
			</div>
		</div>

		<dashboard-appendix v-if="includeAppendix" :user="user" :periods="periods" />

		<checklist-summary v-if="includeSummary && !$apollo.loading"
			v-for="report of user.meritReports" :key="report.id"
			v-bind="report"
			:subjectName="user.full_name"
		/>

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
import LeadershipSection from './Leadership.vue';
import ProfessionalCitizenship from './ProfessionalCitizenship.vue';
import DashboardGoals from './Goals.vue';
import DashboardAppendix from './Appendix.vue';
import ChecklistSummary from '#/MeritCompensation/Summary.vue';

import { renderYearRange, academicYearForDate } from '@/modules/date-utils.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		providerInfo: {
			type: Object,
			default() {
				return {};
			}
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
		},
		includeSummary: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			includeAppendix: true,
			printOptions: {
				printBackground: true
			}
		};
	},
	computed: {
		fiscalYear() {
			const year = new Date(this.dates.startDate).getFullYear();
			return year % 100;
		},
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
		LeadershipSection,
		ProfessionalCitizenship,
		DashboardGoals,
		DashboardAppendix,
		ChecklistSummary
	}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300&display=swap');

.individual-dashboard {
	--heading-font-family: 'Source Sans Pro', sans-serif;
	--heading-font-weight: 300;
	--heading-color: var(--mcw-green);
	--secondary-heading-color: var(--mcw-anesth-dark-green);
}

header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	border-bottom: 2px solid var(--mcw-blue);
	padding-bottom: 1em;
	margin-bottom: 1em;
}

header small {
	display: block;
	margin-bottom: 0.25em;
}

header h1 {
	flex-grow: 10;
	flex-shrink: 0;
	margin-bottom: 0;
}

header img {
	height: 6em;
}

.individual-dashboard {
	-webkit-print-color-adjust: exact;
}

.individual-dashboard >>> h1,
.individual-dashboard >>> h2,
.individual-dashboard >>> h3,
.individual-dashboard >>> h4,
.individual-dashboard >>> h5 {
	font-family: var(--heading-font-family);
	font-weight: var(--heading-font-weight);
	margin-top: 0;
}

.individual-dashboard >>> h2 {
	color: var(--heading-color);
	margin-bottom: 0.5em;
}

.individual-dashboard >>> .checklist-summary {
	page-break-before: always;
}

.dashboard-container::after {
	content: '';
	display: table;
	clear: both;
}

header table {
	font-size: 1.25em;
	margin: 0 1em;
	font-family: var(--heading-font-family);
	font-weight: var(--heading-font-weight);
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

@supports (display: grid) {
	.dashboard-container {
		display: grid;
		grid-gap: 3em;
		grid-template-areas:
			'compensation academic-productivity'
			'citizenship citizenship'
			'leadership goals';
		grid-template-columns: 1fr 1fr;
		align-content: space-between;
	}

	.dashboard-container >>> .individual-merit-dashboard-compensation {
		grid-area: compensation;
	}

	.dashboard-container >>> .individual-merit-dashboard-academic-productivity {
		grid-area: academic-productivity;
	}

	.dashboard-container >>> .leadership {
		grid-area: leadership;
	}

	.dashboard-container >>> .professional-citizenship {
		grid-area: citizenship;
	}

	.dashboard-container >>> .individual-merit-dashboard-goals {
		grid-area: goals;
	}
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

	.dashboard-container {
		height: 100vh;
	}
}

</style>
