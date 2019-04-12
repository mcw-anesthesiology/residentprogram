<template>
	<select-two v-model.number="yearIndex" :readonly="readonly" class="form-control">
		<option v-for="(year, index) of academicYears" :key="index" :value="index">
			{{ renderDateRange(year.startDate, year.endDate) }}
		</option>
	</select-two>
</template>

<script>
import SelectTwo from '@/vue-components/SelectTwo.vue';

import moment from 'moment';

import {
	academicYearForDate,
	datesEqual,
	isoDateString,
	isoDateStringObject,
	renderDateRange
} from '@/modules/date-utils.js';

export default {
	props: {
		value: {
			type: Object,
			required: true
		},
		minDate: {
			type: String,
			default() {
				return isoDateString(academicYearForDate(moment()).endDate);
			}
		},
		maxDate: {
			type: String,
			default() {
				return isoDateString(
					academicYearForDate(moment().add(1, 'year')).startDate);
			}
		},
		descending: {
			type: Boolean,
			default: true
		},
		allTime: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			yearIndex: 0
		};
	},

	computed: {
		academicYears() {
			let maxDate = moment(this.maxDate);
			let d = moment(this.minDate);

			let years = [];

			do {
				years.push(academicYearForDate(d.clone()));

				d.add(1, 'year');
			} while (d < maxDate);

			if (this.descending)
				years.reverse();

			if (this.allTime)
				years.push({
					startDate: null,
					endDate: null
				});

			return years;
		}
	},

	mounted() {
		this.matchIndexWithValue(this.value);
	},

	watch: {
		value(value) {
			this.matchIndexWithValue(value);
		},
		yearIndex(index, lastIndex) {
			index = Number(index);
			lastIndex = Number(lastIndex);
			if (index !== lastIndex)
				this.$emit('input', isoDateStringObject(this.academicYears[index]));
		}
	},

	methods: {
		matchIndexWithValue(value) {
			let newIndex = this.academicYears.findIndex(year =>
				datesEqual(year, value)
			);

			if (newIndex !== -1)
				this.yearIndex = newIndex;
		},
		renderDateRange
	},

	components: {
		SelectTwo
	}
};
</script>
