<template>
	<div>
		<fieldset>
			<legend>Evaluation Date filter</legend>
			<start-end-date v-model="dates" :allTime="true" />
		</fieldset>
		
		<data-table :id="id" :striped="striped" :bordered="bordered"
				:thead="thead" :config="datedConfig" :data="data"
				:exportable="exportable" :exportFilename="exportFilename">
			<slot></slot>
		</data-table>
	</div>
</template>

<script>
import DataTable from './DataTable.vue';
import StartEndDate from './StartEndDate.vue';

import * as dateUtils from '../modules/date-utils.js';

export default {
	extends: DataTable,
	props: {
		range: {
			type: String,
			default: dateUtils.DATE_RANGES.CURRENT_QUARTER,
			validator(value){
				return Object.values(dateUtils.DATE_RANGES).includes(value);
			}
		}
	},
	data(){
		return {
			dates: dateUtils.isoDateStringObject(dateUtils[this.range]())
		};
	},
	computed: {
		datedConfig(){
			if(!this.config || !('ajax' in this.config)
					|| (!this.dates.startDate && !this.dates.endDate))
				return this.config;
				
			let config = Object.assign({}, this.config, {
				ajax: JSON.parse(JSON.stringify(this.config.ajax))
			});
			
			
			if(this.dates.endDate)
				config.ajax.data.evaluation_date_start = [
					'<=', dateUtils.isoDateString(this.dates.endDate)
				];
			if(this.dates.startDate)
				config.ajax.data.evaluation_date_end = [
					'>=', dateUtils.isoDateString(this.dates.startDate)
				];
				
			return config;
		}
	},
	components: {
		DataTable,
		StartEndDate
	}
};
</script>
