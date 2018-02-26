<template>
	<li class="component-list-item">
		<div class="subject">
			<fallback-img :src="`/${subject.photo_path}`" alt="" />
			<p class="subject-name">
				{{ subject.full_name }}
			</p>
			<p class="subject-type">
				{{ ucfirst(subject.specific_type) }}
			</p>
			<p>
				<a :href="evaluateLink" target="_blank">
					Evaluate
				</a>
			</p>
		</div>
		<div class="pairing-metric pairing-metric-num-cases">
			<span class="pairing-metric-value">
				{{ pairing.numCases }}
			</span>
			<span class="pairing-metric-label">
				Cases together
			</span>
		</div>
		<div class="pairing-metric pairing-metric-time-together">
			<span class="pairing-metric-value">
				<php-date-interval :value="pairing.totalTime" />
			</span>
			<span class="pairing-metric-label">
				Time together
			</span>
		</div>
		<div class="pairing-metric-case-list panel panel-default">
			<div class="panel-heading">
				<span class="panel-title">Case details</span>
			</div>
			<div class="panel-body">
				<ul class="cases-list">
					<li v-for="pairingCase of pairingCases">
						<p class="case-procedures">
							{{ pairingCase.procedures.map(cleanProcedureName).join('; ') }}
						</p>

						<dl class="case-details">
							<dt>Date</dt>
							<dd>{{ displayDate(pairingCase.date) }}</dd>

							<template v-if="pairingCase.additionalInfo">
								<template v-for="(value, key) of pairingCase.additionalInfo">
									<dt>
										{{ titleCase(key) }}
									</dt>
									<dd>
										{{ cleanAdditionalInfo(value) }}
									</dd>
								</template>
							</template>
						</dl>
					</li>
				</ul>
			</div>
		</div>
	</li>
</template>

<style scoped>
	.component-list-item {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.component-list-item > * {
		margin: 0.5em;
		flex-grow: 1;
		flex-shrink: 1;
	}

	.subject {
		flex-basis: calc(20% - 1em);
	}

	.pairing-metric-num-cases {
		flex-basis: calc(15% - 1em);
	}

	.pairing-metric-time-together {
		flex-basis: calc(25% - 1em);
	}

	.pairing-metric-case-list {
		flex-basis: calc(40% - 1em);
		min-width: 300px;
		max-width: 100%;
	}

	.pairing-metric-case-list .panel-body {
		max-height: 400px;
		overflow: auto;
	}

	.pairing-metric-case-list li + li {
		margin-top: 0.5em;
	}

	.pairing-metric-case-list dl {
		margin-left: 1em;
	}

	.cases-list {
		font-size: 1.15em;
		list-style-type: disc;
	}

	.case-procedures {
		margin-bottom: 0.5em;
	}

	.case-details {
		font-size: 0.85em;
	}

	.subject {
		text-align: center;
	}

	.subject img {
		display: block;
		margin: 0.25em auto;
		height: 10em;
	}

	.subject-name {
		font-size: 1.15em;
	}

	.subject-type {
		color: rgba(0, 0, 0, 0.65);
	}

	.pairing-metric {
		display: block;
		border: 1px solid rgba(0, 0, 0, 0.15);
		padding: 2em 1em;
		font-size: 1.25em;
		border-radius: 1px;
		text-align: center;
	}

	.pairing-metric .pairing-metric-label {
		display: block;
		color: rgba(0, 0, 0, 0.35);
		font-size: 0.8em;
	}

	.pairing-metric .pairing-metric-value {
		display: block;
		text-align: center;
		font-size: 1.25em;
	}
</style>

<script>
import moment from 'moment';

import FallbackImg from '@/vue-components/FallbackImg.vue';
import PhpDateInterval from '@/vue-components/PhpDateInterval.vue';

import { logError } from '@/modules/errors.js';
import {
	ucfirst,
	titleCase,
	replaceAcronyms
} from '@/modules/text-utils.js';

export default {
	props: {
		pairing: {
			type: Object,
			required: true
		},
		subjectType: {
			type: String,
			required: true
		},
		reportDates: {
			type: Object,
			required: false
		}
	},
	computed: {
		subject() {
			return this.pairing[this.subjectType];
		},
		pairingCases() {
			return this.pairing.cases.sort((a, b) => {
				const aDate = ('date' in a.date)
					? a.date.date
					: a.date;

				const bDate = ('date' in b.date)
					? b.date.date
					: b.date;

				return moment(aDate).valueOf() - moment(bDate).valueOf();
			});
		},
		evaluateLink() {
			const filterType = this.subjectType === 'faculty'
				? 'evaluator'
				: 'subject';

			const params = new URLSearchParams();
			params.set(filterType, this.subject.id);

			if (this.reportDates) {
				params.set('startDate', this.reportDates.startDate);
				params.set('endDate', this.reportDates.endDate);
			}

			return `/request?${params.toString()}`;
		}
	},
	methods: {
		ucfirst,
		titleCase,
		replaceAcronyms,
		displayDate(date) {
			date = ('date' in date)
				? date.date
				: date;

			return moment(date, '').format('l (dddd)');
		},
		sortCases(a, b) {
			try {
				return this.parseDate(a.date) - this.parseDate(b.date);
			} catch (err) {
				logError(err);
				return 0;
			}
		},
		parseDate(date) {
			try {
				let [m, d, y] = date.split('/').map(Number);
				m -= 1;
				if (y < 1900)
					y += 2000;

				return new Date(y, m, d);
			} catch (err) {
				logError(err);
			}
		},
		cleanProcedureName(proc) {
			return replaceAcronyms(ucfirst(proc.toLowerCase())
				.replace(/,(?! )/g, ', '));
		},
		cleanAdditionalInfo(text) {
			return replaceAcronyms(titleCase(text))
				.replace(/Or$/, 'OR');
		}
	},
	components: {
		FallbackImg,
		PhpDateInterval
	}
};
</script>
