<template>
	<div class="form-horizontal" ref="container">
		<div class="form-group">
			<div class="col-md-4">
				<label class="containing-label">
					Date Range
					<select class="form-control" v-model="dateRange">
						<option v-for="(range, name) of dateRanges" :value="name">
							{{ camelCaseToWords(name) }}
						</option>
					</select>
				</label>
			</div>
			<div class="col-sm-6 col-md-4">
				<label class="containing-label">
					Start Date
					<vue-flatpickr class="form-control"
						:options="flatpickrOptions" v-model="startDate" />
				</label>
			</div>
			<div class="col-sm-6 col-md-4">
				<label class="containing-label">
					End Date
					<vue-flatpickr class="form-control"
						:options="flatpickrOptions" v-model="endDate" />
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import VueFlatpickr from 'vue-flatpickr';
import 'vue-flatpickr/theme/flatpickr.min.css';

import { camelCaseToWords } from '../modules/utils.js';
import * as dateUtils from 'modules/date-utils.js';

export default {
	props: {
		value: {
			type: Object,
			required: true
		},
		hideDates: {
			type: Boolean,
			default: false
		},
		allTime: {
			type: Boolean,
			default: false
		},
		ranges: {
			type: Object,
			default() {
				return {
					[dateUtils.DATE_RANGES.CUSTOM]: null,
					[dateUtils.DATE_RANGES.CURRENT_QUARTER]: dateUtils.currentQuarter(),
					[dateUtils.DATE_RANGES.LAST_QUARTER]: dateUtils.lastQuarter(),
					[dateUtils.DATE_RANGES.CURRENT_SEMESTER]: dateUtils.currentSemester(),
					[dateUtils.DATE_RANGES.LAST_SEMESTER]: dateUtils.lastSemester(),
					[dateUtils.DATE_RANGES.CURRENT_YEAR]: dateUtils.currentYear(),
					[dateUtils.DATE_RANGES.LAST_YEAR]: dateUtils.lastYear()
				};
			}
		}
	},
	data(){
		return {
			startDate: this.value.startDate,
			endDate: this.value.endDate,
			dateRange: dateUtils.DATE_RANGES.CUSTOM
		};
	},
	created(){
		this.matchDateRangeWithValue();
	},
	computed: {
		dates(){
			return {
				startDate: this.startDate,
				endDate: this.endDate
			};
		},
		dateRanges(){
			let ranges = Object.assign({}, this.ranges);
			if(this.allTime && !ranges[dateUtils.DATE_RANGES.ALL_TIME])
				ranges[dateUtils.DATE_RANGES.ALL_TIME] = dateUtils.allTime();
			else
				delete ranges[dateUtils.DATE_RANGES.ALL_TIME];
			
			return ranges;
		},
		flatpickrOptions(){
			return {
				altInput: true,
				altInputClass: 'form-control appear-not-readonly',
				altFormat: 'M j, Y'
			};
		}
	},
	watch: {
		dates(dates){
			this.$emit('input', dates);
		},
		value(value){
			this.matchDateRangeWithValue();
			this.startDate = value.startDate;
			this.endDate = value.endDate;
		},
		dateRange(dateRange){
			if(dateRange === dateUtils.DATE_RANGES.ALL_TIME)
				this.setDate(dateUtils.allTime());
			
			if(dateRange !== dateUtils.DATE_RANGES.CUSTOM && this.dateRanges[dateRange]
					&& !dateUtils.datesEqual(this.value, this.dateRanges[dateRange]))
				this.setDate(this.dateRanges[dateRange]);
		}
	},
	methods: {
		matchDateRangeWithValue(value = this.value){
			if(this.allTime && !value.startDate && !value.endDate){
				this.dateRange = dateUtils.DATE_RANGES.ALL_TIME;
				return;
			}
			
			if(this.dateRange && this.dateRange !== dateUtils.DATE_RANGES.CUSTOM
					&& this.dateRanges[this.dateRange]
					&& dateUtils.datesEqual(value, this.dateRanges[this.dateRange]))
				return;

			for(let range of Object.values(dateUtils.DATE_RANGES)){
				if(this.dateRanges[range] && dateUtils.datesEqual(value, this.dateRanges[range])){
					this.dateRange = range;
					return;
				}
			}

			this.dateRange = dateUtils.DATE_RANGES.CUSTOM;
		},
		setDate(dates){
			dates = dateUtils.isoDateStringObject(dates);
			this.startDate = dates.startDate;
			this.endDate = dates.endDate;
		},
		camelCaseToWords
	},
	components: {
		VueFlatpickr
	}
};
</script>

<style scoped>
	.form-horizontal {
		overflow-x: hidden;
	}
</style>
