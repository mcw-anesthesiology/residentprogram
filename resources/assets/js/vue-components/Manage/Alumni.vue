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
				<button type="button" class="btn btn-info btn-sm"
						@click="emailAllAlumni">
					<span class="glyphicon glyphicon-send"></span>
					Send emails
				</button>
			</h1>

			<alert-list v-model="alerts"></alert-list>
		</div>

		<router-view :alum="alumniBeingEdited"
			:save-url="saveAlumUrl" manage
			@reload="reloadAfterEdit"
			@close="handleClose">
		</router-view>

		<div v-if="emailTo && (!Array.isArray(emailTo) || emailTo.length > 0)"
				class="container body-block">
			<email-editor target="/alumni/email"
				:default-to="emailTo"
				:possible-recipients="possibleRecipients"
				:group-recipients="false"
				default-subject="MCW Anesthesiology alumni"
				:default-body-markdown="defaultBodyMarkdown"
				:email-replacements="emailReplacements"
				:edit-to-on-send="ensureToArray"
				@close="emailTo = null">
			</email-editor>
		</div>

		<div class="container body-block">
			<h2 class="sub-heading">Alumni</h2>
			<component-list :items="alumni" :fields="alumniFields"
					reloadable @reload="fetchAlumni">
				<template slot-scope="alum">
					<alumni-list-item :alum="alum"
						@email="emailAlum(alum)"
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

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ComponentList from '@/vue-components/ComponentList.vue';
import EmailEditor from '@/vue-components/EmailEditor.vue';

import AlumniListItem from '@/vue-components/Alumni/AlumniListItem.vue';

import { getHeaderHeight } from '@/modules/dom-utils.js';
import { getFetchHeaders, okOrThrow, jsonOrThrow } from '@/modules/utils.js';

export default {
	mixins: [
		HasAlerts
	],
	data(){
		return {
			alumni: [],

			alumniBeingEdited: null,

			emailTo: null
		};
	},

	mounted(){
		this.fetchAlumni();
	},

	computed: {
		possibleRecipients() {
			return this.alumni.filter(alum => alum.email && !alum.do_not_contact);
		},
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
		},
		defaultBodyMarkdown() {
			return `Hello Dr [[Last name]],

We want to keep in touch with you! Please use the link below to enter your
information so we can send you newsletters or to manage your alumni subscription!

[[Link]]`;

		},
		emailReplacements() {
			return [
				'Name',
				'Last name',
				'Link'
			];
		},
		saveAlumUrl() {
			return this.alumniBeingEdited
				? `/alumni/${this.alumniBeingEdited.id}`
				: '/alumni';
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
		reloadAfterEdit() {
			this.handleClose();
			this.fetchAlumni();
		},
		emailAlum(alum) {
			if (alum.email && !alum.do_not_contact)
				this.emailTo = [alum];
		},
		emailAllAlumni() {
			this.emailTo = this.alumni.filter(alum => alum.email && !alum.do_not_contact);
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
		ensureToArray(to) {
			return Array.isArray(to)
				? to
				: [to];
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
			this.$router.push('/');
		}
	},

	components: {
		ComponentList,
		EmailEditor,
		AlumniListItem
	}
};
</script>
