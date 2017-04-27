<template>
	<div>
		<div class="row">
			<div class="form-group">
				<label class="containing-label">
					Academic year
					<academic-year-selector v-model="dates"
						:min-date="startDate" />
				</label>
			</div>
		</div>
		
		<data-table :id="id" :striped="striped" :bordered="bordered"
				:thead="thead" :config="datedConfig" :data="data"
				:exportable="exportable" :exportFilename="exportFilename">
			<slot></slot>
		</data-table>
	</div>
</template>

<script>
import EvaluationDataTable from './EvaluationDataTable.vue';
import DataTable from './DataTable.vue';
import AcademicYearSelector from './AcademicYearSelector.vue';

import { academicYearForDate } from 'modules/date-utils.js';

export default {
	extends: EvaluationDataTable,
	props: {
		startDate: {
			type: String,
			default: '2015-07-01' // Year faculty evals released
		}
	},
	data() {
		return {
			dates: academicYearForDate(new Date())
		};
	},
	
	components: {
		AcademicYearSelector,
		DataTable
	}
};
</script>
