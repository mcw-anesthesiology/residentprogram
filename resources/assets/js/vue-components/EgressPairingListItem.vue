<template>
	<li class="component-list-item">
		<div class="subject">
			<placeholder-fallback-img :src="`/${subject.photo_path}`" alt="" />
			{{ subject.full_name }}
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
		<div class="pairing-metric-case-list">
			<ul>
				<li v-for="i of [1, 2, 3, 4, 5]">
					Things
				</li>
			</ul>
		</div>
	</li>
</template>

<style scoped>
	.component-list-item {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
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

	.subject {
		text-align: center;
		padding: 1em;
	}

	.subject img {
		display: block;
		margin: 0.25em auto;
		height: 10em;
	}

	.pairing-metric {
		display: block;
		border: 1px solid rgba(0, 0, 0, 0.15);
		padding: 2em;
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

import PlaceholderFallbackImg from '@/vue-components/PlaceholderFallbackImg.vue';
import PhpDateInterval from '@/vue-components/PhpDateInterval.vue';

import { logError } from '@/modules/errors.js';
import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		pairing: {
			type: Object,
			required: true
		},
		subjectType: {
			type: String,
			required: true
		}
	},
	computed: {
		subject() {
			return this.pairing[this.subjectType];
		}
	},
	methods: {
		ucfirst,
		renderDate(d) {
			return moment(d).format('dddd ll');
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
			return ucfirst(proc.toLowerCase())
				.replace(/,(?! )/g, ', ');
		}
	},
	components: {
		PlaceholderFallbackImg,
		PhpDateInterval
	}
};
</script>
