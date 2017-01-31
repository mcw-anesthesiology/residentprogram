<template>
	<div class="form-horizontal" ref="container">
		<div class="form-group">
			<div class="col-md-4">
				<label class="containing-label">
					Date Range
					<select class="form-control" v-model="dateRange">
						<option v-for="range of DATE_RANGES" :value="range">
							{{ camelCaseToWords(range) }}
						</option>
					</select>
				</label>
			</div>
			<div class="col-sm-6 col-md-4">
				<label class="containing-label">
					Start Date
					<vue-flatpickr class="form-control"
						:value="value.startDate" :options="flatpickrOptions"
						@input="handleInput('startDate', arguments[0])"/>
				</label>
			</div>
			<div class="col-sm-6 col-md-4">
				<label class="containing-label">
					End Date
					<vue-flatpickr class="form-control"
						:value="value.endDate" :options="flatpickrOptions"
						@input="handleInput('endDate', arguments[0])"/>
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import VueFlatpickr from 'vue-flatpickr';
import 'vue-flatpickr/theme/flatpickr.min.css';

import { camelCaseToWords } from '../modules/utils.js';
import {
	DATE_RANGES,
	isoDateStringObject,
	currentQuarter,
	lastQuarter,
	currentSemester,
	lastSemester,
	currentYear,
	lastYear
} from '../modules/date-utils.js';

export default {
	props: {
		value: {
			type: Object,
			required: true
		},
		allTime: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			dateRange: DATE_RANGES.CUSTOM
		};
	},
	created(){
		this.matchDateRangeWithValue();
	},
	computed: {
		DATE_RANGES(){
			let ranges = Object.assign({}, DATE_RANGES);
			if(!this.allTime)
				delete ranges.ALL_TIME;
			
			return ranges;
		},
		flatpickrOptions(){
			return {
				altInput: true,
				altInputClass: 'form-control appear-not-readonly',
				altFormat: 'M j, Y'
			};
		},
		currentQuarter,
		lastQuarter,
		currentSemester,
		lastSemester,
		currentYear,
		lastYear
	},
	watch: {
		value(){
			this.matchDateRangeWithValue();
		},
		dateRange(dateRange){
			if(dateRange === DATE_RANGES.ALL_TIME)
				this.setDate({
					startDate: null,
					endDate: null
				});
			
			if(dateRange !== DATE_RANGES.CUSTOM && this[dateRange]
					&& !this.datesEqual(this.value, this[dateRange]))
				this.setDate(this[dateRange]);
		}
	},
	methods: {
		matchDateRangeWithValue(value = this.value){
			if(this.allTime && !value.startDate && !value.endDate){
				this.dateRange = this.DATE_RANGES.ALL_TIME;
				return;
			}
			
			if(this.dateRange && this.dateRange !== DATE_RANGES.CUSTOM
					&& this[this.dateRange]
					&& this.datesEqual(value, this[this.dateRange]))
				return;

			for(let range of Object.values(DATE_RANGES)){
				if(this[range] && this.datesEqual(value, this[range])){
					this.dateRange = range;
					return;
				}
			}

			this.dateRange = DATE_RANGES.CUSTOM;
		},
		handleInput(prop, value){
			let newValue = Object.assign({}, this.value, {[prop]: value});
			this.$emit('input', newValue);
		},
		datesEqual(dates1, dates2){
			dates1 = isoDateStringObject(dates1);
			dates2 = isoDateStringObject(dates2);

			return dates1.startDate === dates2.startDate
				&& dates1.endDate === dates2.endDate;
		},
		setDate(dates){
			this.$emit('input', isoDateStringObject(dates));
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
