import Vue from 'vue';

import AlertList from '../../vue-components/AlertList.vue';
import DataTable from '../../vue-components/DataTable.vue';
import OrderingList from '../../vue-components/OrderingList.vue';
import ShowHideButton from '../../vue-components/ShowHideButton.vue';

import { getFetchHeaders, jsonOrThrow } from '../../modules/utils.js';

export default function createManageMilestonesCompetencies(el, propsData){
	
	return new Vue({
		el,
		props: {
			
		},
		propsData,
		
		data(){
			return {
				milestones: [],
				competencies: [],
				
				orderedMilestones: [],
				orderedCompetencies: [],
				
				show: {
					milestoneOrder: false,
					competencyOrder: false
				},
				
				milestoneAlerts: [],
				competencyAlerts: []
			};
		},
		
		mounted(){
			fetch('/milestones', {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(milestones => {
				this.milestones = milestones;
			}).catch(err => {
				console.error(err);
				this.milestoneAlerts.push({
					type: 'error',
					html: '<strong>Error: </strong> Problem fetching milestones'
				});
			});
			
			fetch('/competencies', {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(competencies => {
				this.competencies = competencies;
			}).catch(err => {
				console.error(err);
			});
		},
		
		computed: {
			milestonesThead(){
				return [[
					'Title',
					'Type',
					'Subspecialty',
					'Description',
					'Action'
				]];
			},
			milestonesConfig(){
				return {
					ajax: {
						url: '/milestones',
						data: {
							with: {
								forms: true
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'title'},
						{data: 'type'},
						{data: 'training_level'},
						{data: 'description'},
						{data: null, searchable: false, orderable: false, render(milestone){
							const milestoneData = `data-id="${milestone.id}"
								data-title="${milestone.title}"
								data-type="${milestone.type}"
								data-training-level="${milestone.training_level}"
								data-description="${milestone.description}"`;
								
							const editButton = `
							<button type="button"
									class="edit-milestone-button btn btn-info btn-xs"
									${milestoneData}>
								<span class="glyphicon glyphicon-edit"></span>
								Edit
							</button>`;
							
							const levelsButton = `
							<button type="button"
									class="edit-milestone-levels-button btn btn-info btn-xs"
									${milestoneData}>
								<span class="glyphicon glyphicon-th-list"></span>
								Levels
							</button>`;
							
							const deleteButton = `
							<button type="button"
									class="delete-milestone-button btn btn-danger btn-xs"
									${milestoneData}>
								<span class="glyphicon glyphicon-remove"></span>
								Delete
							</button>`;
							
							return `${editButton} ${levelsButton}
								${milestone.forms.length === 0 ? deleteButton : ''}`;
						}}
					]
				};
			},
			
			competenciesThead(){
				return [[
					'Title',
					'Description',
					'Action'
				]];
			},
			competenciesConfig(){
				return {
					ajax: {
						url: '/competencies',
						data: {
							with: {
								forms: true
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'title'},
						{data: 'description'},
						{data: null, searchable: false, orderable: false, render: function(competency){
							const competencyData = `data-id="${competency.id}"
								data-title="${competency.title}"
								data-description="${competency.description}"`;
							
							const editButton = `
							<button type="button"
									class="edit-competency-button btn btn-info btn-xs"
									${competencyData}>
								<span class="glyphicon glyphicon-edit"></span>
								Edit
							</button>`;
							
							const deleteButton = `
							<button type="button"
									class="delete-competency-button btn btn-danger btn-xs"
									${competencyData}>
								<span class="glyphicon glyphicon-remove"></span>
								Delete
							</button>`;
							
							return `${editButton} ${competency.forms.length === 0 ? deleteButton : ''}`;
						}}
					]
				};
			},
		},
		
		methods: {
			
		},
		
		components: {
			AlertList,
			DataTable,
			OrderingList,
			ShowHideButton
		}
	});
}
