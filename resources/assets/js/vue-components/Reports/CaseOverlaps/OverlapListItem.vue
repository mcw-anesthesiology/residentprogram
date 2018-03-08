<template>
	<div class="overlap-list-item">
		<header>
			<p class="overlap-user-name">
				{{ overlap.user.full_name }}
			</p>
			<show-hide-button class="btn btn-info btn-sm"
					v-model="show.detailedReport">
				detailed report
			</show-hide-button>
		</header>
		<ol class="pairings-list">
			<li v-for="pairing of overlap.pairings" class="pairings-list-item">
				<div class="pairings-list-item-row">
					<div class="subject-name">
						<span>
							{{ pairing.partner.full_name }}
						</span>
					</div>
					<div class="num-cases">
						<span>
							{{ pairing.numCases }} cases
						</span>
					</div>
					<div class="total-time">
						<php-date-interval :value="pairing.totalTime" />
					</div>
				</div>
			</li>
		</ol>

		<div v-if="show.detailedReport"
				class="panel panel-default detailed-report-panel">
			<div class="panel-heading">
				<span class="panel-title">Detailed report</span>
			</div>
			<div class="panel-body detailed-report-body">
				<case-overlap :user="overlap.user"
					:pairings="overlap.pairings"
					:subject-type="subjectType"
					:reportDates="reportDates" />
			</div>
			<div class="panel-footer text-center">
				<show-hide-button class="btn btn-info"
						v-model="show.detailedReport">
					detailed report
				</show-hide-button>
			</div>
		</div>
	</div>
</template>

<script>
import PhpDateInterval from '@/vue-components/PhpDateInterval.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import CaseOverlap from '@/vue-components/CaseOverlaps/CaseOverlap.vue';

export default {
	props: {
		overlap: {
			type: Object,
			required: true
		},
		userType: {
			type: String,
			default: 'faculty'
		},
		subjectType: {
			type: String,
			default: 'trainee'
		},
		reportDates: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			show: {
				detailedReport: false
			}
		};
	},

	components: {
		PhpDateInterval,
		ShowHideButton,
		CaseOverlap
	}
};
</script>

<style scoped>
	.overlap-list-item {
		margin: 1em 0.5em;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.overlap-user-name {
		font-size: 1.25em;
		margin: 0;
	}

	.pairings-list {
		margin-left: 2em;
	}

	.pairings-list-item {
		font-family: monospace;
		padding: 0.25em;
	}

	.pairings-list-item:not(:last-child) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}

	.pairings-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.pairings-list-item-row {
		display: flex;
		justify-content: space-around;
	}

	.pairings-list-item-row > * {
		flex-grow: 1;
	}

	.subject-name {
		flex-basis: 50%;
	}

	.num-cases {
		flex-basis: 20%;
	}

	.total-time {
		flex-basis: 30%;
	}

	.num-cases,
	.total-time {
		text-align: right;
	}

	.detailed-report-panel {
		margin: 1em;
	}

	.detailed-report-body {
		max-height: 400px;
		overflow: auto;
	}
</style>
