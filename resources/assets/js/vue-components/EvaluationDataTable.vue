<template>
	<div>
		<start-end-date v-model="dates" :allTime="true" />
		
		<data-table :id="id" :striped="striped" :bordered="bordered"
			:thead="thead" :config="datedConfig" :data="data" :exportable="exportable"
			:exportFilename="exportFilename" />
	</div>
</template>

<script>
import DataTable from './DataTable.vue';
import StartEndDate from './StartEndDate.vue';

import {
	isoDateString,
	isoDateStringObject,
	currentQuarter
} from '../modules/date-utils.js';

export default {
	extends: DataTable,
	data(){
		return {
			dates: isoDateStringObject(currentQuarter())
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
					'<=', isoDateString(this.dates.endDate)
				];
			if(this.dates.startDate)
				config.ajax.data.evaluation_date_end = [
					'>=', isoDateString(this.dates.startDate)
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
