<template>
	<div>
		<fieldset>
			<legend>Evaluation Date filter</legend>
			<start-end-date v-model="dates" all-time />
		</fieldset>

		<data-table :id="id" :striped="striped" :bordered="bordered"
				:thead="thead" :config="datedConfig" :data="data"
				:exportable="exportable" :export-filename="exportFilename">
			<slot></slot>
		</data-table>
	</div>
</template>

<script>
import DataTable from './DataTable.vue';
import StartEndDate from './StartEndDate.vue';

import * as localforage from 'localforage';
import moment from 'moment';

import { logError } from '@/modules/errors.js';
import * as dateUtils from '@/modules/date-utils.js';

window.localforage = localforage;

export default {
	extends: DataTable,
	props: {
		id: {
			type: String,
			required: false
		},
		range: {
			type: String,
			default: dateUtils.DATE_RANGES.CURRENT_QUARTER,
			validator(value){
				return Object.values(dateUtils.DATE_RANGES).includes(value);
			}
		},
		startProp: {
			type: String,
			default: 'evaluation_date_start'
		},
		endProp: {
			type: String,
			default: 'evaluation_date_end'
		}
	},
	data(){
		return {
			// eslint-disable-next-line import/namespace
			dates: dateUtils.isoDateStringObject(dateUtils[this.range]())
		};
	},
	mounted(){
		if(this.id){
			localforage.getItem(this.localforageKey).then(state => {
				if(state){
					let now = moment();
					if(state.createdAt >= now.subtract(6, 'hours').toDate()){
						this.dates = state.dates;
					}
					else {
						localforage.removeItem(this.localforageKey);
					}
				}
			});
		}
	},
	computed: {
		localforageKey(){
			if(this.id)
				return `${this.id}-evaluation-data-table`;
		},
		evaluationConfig(){
			return Object.assign({
				stateSave: true,
				deferRender: true
			}, this.config);
		},
		datedConfig(){
			if(!this.evaluationConfig || !('ajax' in this.evaluationConfig)
					|| (!this.dates.startDate && !this.dates.endDate))
				return this.evaluationConfig;

			let config = Object.assign({}, this.evaluationConfig, {
				ajax: JSON.parse(JSON.stringify(this.evaluationConfig.ajax))
			});


			if(this.dates.endDate)
				config.ajax.data[this.startProp] = [
					'<=', dateUtils.isoDateString(this.dates.endDate)
				];
			if(this.dates.startDate)
				config.ajax.data[this.endProp] = [
					'>=', dateUtils.isoDateString(this.dates.startDate)
				];

			return config;
		}
	},
	watch: {
		dates(dates){
			if(this.id){
				localforage.setItem(this.localforageKey, {
					dates,
					createdAt: new Date()
				}).catch(logError);
			}
		}
	},
	components: {
		DataTable,
		StartEndDate
	}
};
</script>
