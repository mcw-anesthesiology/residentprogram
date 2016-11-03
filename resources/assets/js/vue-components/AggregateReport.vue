<template>
	<div class="container body-block">
		<fieldset>
			<legend>Show in report</legend>
			<label v-for="(part, name) of show">
				<input type="checkbox" v-model="show[name]" />
				{{ camelCaseToWords(name) }}
			</label>
		</fieldset>

		<data-table id="aggregate-table" :thead="tableThead"
			:config="tableConfig" :data="tableData" />

		<chartjs-chart id="aggregate-chart" default-type="radar"
		 	:options="chartOptions" :data="chartData" />
	</div>
</template>

<script>
import ChartjsChart from './ChartjsChart.vue';
import DataTable from './DataTable.vue';

import { camelCaseToWords } from '../modules/utils.js';

export default {
	props: [
		'report'
	],
	data(){
		return {
			show: {
				milestones: false,
				competencies: true,
				standardDeviations: false
			}
		};
	},
	computed: {
		colsPerItem(){
			return this.show.standardDeviations
				? 3
				: 2;
		},
		milestoneColspan(){
			return this.colsPerItem * Object.keys(this.report.milestones).length;
		},
		competencyColspan(){
			return this.colsPerItem * Object.keys(this.report.competencies).length;
		},
		tableThead(){
			let thead = [];
			let row = [];
			row.push({rowspan: 3, text: 'Trainee'});
			if(this.show.milestones)
				row.push({
					colspan: this.milestoneColspan,
					text: 'Milestones'
				});
			if(this.show.competencies)
				row.push({
					colspan: this.competencyColspan,
					text: 'Competencies'
				});
			row.push({colspan: 3, text: 'All'});
			thead.push(row);

			row = [];
			if(this.show.milestones){
				for(let milestoneId in this.report.milestones){
					row.push({
						colspan: this.colsPerItem,
						text: this.report.milestones[milestoneId]
					});
				}
			}
			if(this.show.competencies){
				for(let competencyId in this.report.competencies){
					row.push({
						colspan: this.colsPerItem,
						text: this.report.competencies[competencyId]
					});
				}
			}
			row.push({colspan: 3, text: 'Total'});
			thead.push(row);

			row = [];
			if(this.show.milestones){
				for(let milestoneId in this.report.milestones){
					row.push({text: 'Average'});
					if(this.show.standardDeviations)
						row.push({text: 'Std. Dev.'});
					row.push({text: '#'});
				}
			}
			if(this.show.competencies){
				for(let competencyId in this.report.competencies){
					row.push({text: 'Average'});
					if(this.show.standardDeviations)
						row.push({text: 'Std. Dev.'});
					row.push({text: '#'});
				}
			}
			row.push({text: '# Evaluators'});
			row.push({text: '# Evaluations'});
			row.push({text: '# Trainee Requests'});
			thead.push(row);

			return thead;
		},
		tableConfig(){
			return {
				order: [[0, 'asc']],
				stateSave: true,
				dom: 'lfprtip',
				scrollX: true,
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				fixedColumns: true,
			};
		},
		tableData(){
			let data = [];
			for(let subjectId in this.report.subjects){
				let row = [];
				row.push(this.report.subjects[subjectId]);
				if(this.show.milestones){
					for(let milestoneId in this.report.milestones){
						row.push(
							this.report.subjectMilestone
									&& this.report.subjectMilestone[subjectId]
									&& this.report.subjectMilestone[subjectId][milestoneId]
								? parseFloat(this.report.subjectMilestone[subjectId][milestoneId]).toFixed(2)
								: ''
						);

						if(this.show.standardDeviations)
							row.push(
								this.report.subjectMilestoneDeviations
										&& this.report.subjectMilestoneDeviations[subjectId]
										&& this.report.subjectMilestoneDeviations[subjectId][milestoneId]
									? parseFloat(this.report.subjectMilestoneDeviations[subjectId][milestoneId]).toFixed(2)
									: ''
							);

						row.push(
							this.report.subjectMilestoneEvals
									&& this.report.subjectMilestoneEvals[subjectId]
									&& this.report.subjectMilestoneEvals[subjectId][milestoneId]
								? parseFloat(this.report.subjectMilestoneEvals[subjectId][milestoneId]).toFixed()
								: 0
						);
					}
				}

				if(this.show.competencies){
					for(let competencyId in this.report.competencies){
						row.push(
							this.report.subjectCompetency
									&& this.report.subjectCompetency[subjectId]
									&& this.report.subjectCompetency[subjectId][competencyId]
								? parseFloat(this.report.subjectCompetency[subjectId][competencyId]).toFixed(2)
								: ''
						);

						if(this.show.standardDeviations)
							row.push(
								this.report.subjectCompetencyDeviations
										&& this.report.subjectCompetencyDeviations[subjectId]
										&& this.report.subjectCompetencyDeviations[subjectId][competencyId]
									? parseFloat(this.report.subjectCompetencyDeviations[subjectId][competencyId]).toFixed(2)
									: ''
							);

						row.push(
							this.report.subjectCompetencyEvals
									&& this.report.subjectCompetencyEvals[subjectId]
									&& this.report.subjectCompetencyEvals[subjectId][competencyId]
								? parseFloat(this.report.subjectCompetencyEvals[subjectId][competencyId]).toFixed()
								: 0
						);
					}
				}

				row.push(Object.keys(this.report.subjectEvaluators[subjectId]).length);
				row.push(Object.keys(this.report.subjectEvals[subjectId]).length);
				row.push(Object.keys(this.report.subjectRequests[subjectId]).length);

				data.push(row);
			}

			return data;
		},
		chartOptions(){
			return {
				// tooltips: {
				// 	callbacks: {
				// 		label(tooltip){
				// 			return parseFloat(tooltip.yLabel).toFixed(2);
				// 		}
				// 	}
				// }
			}
		},
		chartData(){
			return {
				labels: Object.values(this.report.competencies),
				datasets: [
					{
						label: 'Average Competencies',
						data: Object.values(this.report.averageCompetency)
					}
				]
			};
		}
	},
	methods: {
		camelCaseToWords
	},
	components: {
		ChartjsChart,
		DataTable
	}
};
</script>
