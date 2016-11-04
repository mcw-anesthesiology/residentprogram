<template>
	<div class="container body-block">
		<fieldset class="show-container">
			<legend>Show</legend>
			<label v-for="(part, name) of show">
				<input type="checkbox" v-model="show[name]" />
				{{ camelCaseToWords(name) }}
			</label>
		</fieldset>


	</div>
</template>

<script>
import DataTable from './DataTable.vue';

import { camelCaseToWords } from '../modules/utils.js';

export default {
	props: [

	],
	data(){
		return {
			show: {
				ratio: false,
				graph: false,
				noRequests: false,
				noneCompleted: false,
				lastCompleted: false
			}
		};
	},
	computed: {
		statsThead(){
			return [
				'User',
				'Requested',
				'Total Requests',
				'Total Completed',
				'Total Ratio'
			];
		},
		statsConfig(){

		},
		statsData(){

		}
	},
	methods: {
		camelCaseToWords
	},
	components: {
		DataTable
	}
};
</script>

<style scoped>
	.show-container label + label {
		margin-left: 2em;
	}
</style>
