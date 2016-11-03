<template>
	<div class="container body-block">
		<fieldset>
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

	},
	methods: {
		camelCaseToWords
	},
	components: {
		DataTable
	}
};
</script>
