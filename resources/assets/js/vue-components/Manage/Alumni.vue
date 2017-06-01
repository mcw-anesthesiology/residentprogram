<template>
	<div>
		<div class="container body-block">
			<h1>
				Manage Alumni
				<router-link to="edit" class="btn btn-success btn-sm">
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

		<router-view :alum="alumniBeingEdited" manage
			@reload="fetchAlumni"
			@close="handleClose">
		</router-view>

		<div class="container body-block">
			<h2 class="sub-heading">Alumni</h2>
			<component-list :items="alumni" :fields="alumniFields"
					reloadable @reload="fetchAlumni">
				<template scope="alum">
					<alumni-list-item :alum="alum"
						@edit="editAlum(alum)"
						@alert="this.alerts.push(arguments[0])"
						@remove="removeAlum(alum)">
					</alumni-list-item>
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import ComponentList from '../ComponentList.vue';
import AlumniListItem from './Alumni/AlumniListItem.vue';

import { getHeaderHeight } from 'modules/dom-utils.js';
import { getFetchHeaders, okOrThrow, jsonOrThrow } from '../../modules/utils.js';

export default {
	mixins: [
		HasAlerts
	],
	data(){
		return {
			alumni: [],

			alumniBeingEdited: null
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
		},
		editAlum(alum) {
			this.alumniBeingEdited = alum;
			this.$router.push('edit');
			this.$nextTick(() => {
				$('.edit-alum').velocity('scroll', {
					offset: -1 * getHeaderHeight()
				});
			});
		},
		removeAlum(alum) {
			fetch(`/alumni/${alum.id}`, {
				method: 'POST', // DELETE
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					_method: 'DELETE'
				})
			}).then(okOrThrow).then(() => {
				this.fetchAlumni();
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem removing the alum'
				});
			});
		},
		handleClose() {
			this.alumniBeingEdited = null;
			this.$router.go(-1);
		}
	},

	components: {
		ComponentList,
		AlumniListItem
	}
};
</script>
