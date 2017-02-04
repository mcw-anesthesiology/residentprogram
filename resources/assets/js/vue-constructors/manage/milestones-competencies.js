import Vue from 'vue';

import AlertList from '../../vue-components/AlertList.vue';
import DataTable from '../../vue-components/DataTable.vue';
import OrderingList from '../../vue-components/OrderingList.vue';
import ShowHideButton from '../../vue-components/ShowHideButton.vue';

import {
	getFetchHeaders,
	jsonOrThrow,
	sortPropNumbers
} from '../../modules/utils.js';
import { ucfirst } from '../../modules/utils.js';

export default function createManageMilestonesCompetencies(el, propsData){
	
	return new Vue({
		el,
		props: {
			
		},
		propsData,
		
		data(){
			return {
				milestones: null,
				competencies: null,
				
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
			this.fetchMilestones();
			this.fetchCompetencies();
		},
		
		computed: {
			milestonesThead(){
				return [[
					'Order',
					'Title',
					'Type',
					'Subspecialty',
					'Description',
					'Action'
				]];
			},
			milestonesConfig(){
				return {
					columns: [
						{data: 'order', render(order, type){
							if(['sort', 'type'].includes(type))
								return order != null
									? Number(order) + 1
									: Number.MAX_VALUE;
							
							return order != null
								? Number(order) + 1
								: '';
						}},
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
					'Order',
					'Title',
					'Description',
					'Action'
				]];
			},
			competenciesConfig(){
				return {
					columns: [
						{data: 'order', render(order, type){
							if(['sort', 'type'].includes(type))
								return order != null
									? Number(order) + 1
									: Number.MAX_VALUE;
							
							return order != null
								? Number(order) + 1
								: '';
						}},
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
		
		watch: {
			competencies(competencies){
				this.orderedCompetencies = competencies.filter(competency =>
					competency.order != null).sort(sortPropNumbers('order'));
			},
			milestones(milestones){
				this.orderedMilestones = milestones.filter(milestone =>
					milestone.order != null).sort(sortPropNumbers('order'));
			}
		},
		
		methods: {
			ucfirst,
			fetchMilestones(){
				const query = $.param({
					with: {
						forms: true
					}
				});
				
				return fetch(`/milestones?${query}`, {
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
			},
			fetchCompetencies(){
				const query = $.param({
					with: {
						forms: true
					}
				});
				
				return fetch(`/competencies?${query}`, {
					method: 'GET',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
				}).then(jsonOrThrow).then(competencies => {
					this.competencies = competencies;
				}).catch(err => {
					console.error(err);
					this.competencyAlerts.push({
						type: 'error',
						html: '<strong>Error: </strong> Problem fetching competencies'
					});
				});
			},
			saveMilestoneOrder(){
				const orderMap = this.orderedMilestones.map((milestone, index) => ({
					id: milestone.id,
					order: index
				}));
				
				fetch('/milestones/order', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						orderMap
					})
				}).then(jsonOrThrow).then(results => {
					if(results.success && results.success.length === this.orderedMilestones.length)
						this.milestoneAlerts.push({
							type: 'success',
							text: 'All orders saved successfully'
						});
					else if(results.error && results.error.length === this.orderedMilestones.length)
						throw new Error(results);
					else
						this.milestoneAlerts.push({
							type: 'warning',
							text: 'Some orders were not saved successfully'
						});
						
					this.fetchMilestones();
				}).catch(err => {
					console.error(err);
					this.milestoneAlerts.push({
						type: 'error',
						text: 'There was a problem saving the orders'
					});
				});
			},
			saveCompetencyOrder(){
				const orderMap = this.orderedCompetencies.map((competency, index) => ({
					id: competency.id,
					order: index
				}));
				
				fetch('/competencies/order', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						orderMap
					})
				}).then(jsonOrThrow).then(results => {
					if(results.success && results.success.length === this.orderedCompetencies.length)
						this.competencyAlerts.push({
							type: 'success',
							text: 'All orders saved successfully'
						});
					else if(results.error && results.error.length === this.orderedCompetencies.length)
						throw new Error(results);
					else
						this.competencyAlerts.push({
							type: 'warning',
							text: 'Some orders were not saved successfully'
						});
					this.fetchCompetencies();
				}).catch(err => {
					console.error(err);
					this.competencyAlerts.push({
						type: 'error',
						text: 'There was a problem saving the orders'
					});
				});
			}
		},
		
		components: {
			AlertList,
			DataTable,
			OrderingList,
			ShowHideButton
		}
	});
}
