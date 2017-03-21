<template>
	<div>
		<div class="container body-block">
			<h1>
				Manage Alumni
				<router-link to="add" class="btn btn-success btn-sm">
					<span class="glyphicon glyphicon-plus"></span>
					Add alum			
				</router-link>
				<router-link to="import" class="btn btn-primary btn-sm">
					<span class="glyphicon glyphicon-import"></span>
					Import alumni
				</router-link>
			</h1>
			
			<alert-list v-model="alerts"></alert-list>
		</div>
		
		<router-view></router-view>
		
		<div class="container body-block">
			<h2 class="sub-heading">Alumni</h2>
			<component-list :items="alumni" :fields="alumniFields">
				<template scope="alum">
					<alumni-list-item :alum="alum"></alumni-list-item>
				</template>
			</component-list>
		</div>		
	</div>
</template>

<script>
import moment from 'moment';

import AlertList from '../AlertList.vue';
import ComponentList from '../ComponentList.vue';
import AlumniListItem from './Alumni/AlumniListItem.vue';

import { getFetchHeaders, jsonOrThrow } from '../../modules/utils.js';

export default {
	data(){
		return {
			alumni: [],
			
			alumniBeingEdited: {},
			
			alerts: []
		};
	},
	
	mounted(){
		this.fetchAlumni();
	},
	
	computed: {
		alumniFields(){
			return [
				'full_name',
				'email',
				'address',
				'address_2',
				'country',
				'graduation_date',
			];
		},
		alumniSortFunctions(){
			return new Map([
				['graduation_date', (a, b) =>
					moment(a).valueOf() - moment(b).valueOf()
				]
			]);
		}
	},
	
	methods: {
		fetchAlumni(){
			fetch('/alumni', {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(alumni => {
				this.alumni = alumni;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching alumni'
				});
			});
		}
	},
	
	components: {
		AlertList,
		ComponentList,
		AlumniListItem
	}
};
</script>
