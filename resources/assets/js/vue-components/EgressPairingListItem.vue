<template>
	<li class="component-list-item">
		<span class="subject-name">
			{{ pairing[subjectType].full_name }}
		</span>
	</li>
</template>

<script>
import moment from 'moment';

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
		PhpDateInterval
	}
};
</script>
