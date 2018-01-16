<template>
	<div class="container body-block">
		<h2>Import alumni</h2>

		<div>
			<h3>Import from spreadsheet</h3>
			<form>
				<input type="file" disabled />
				<button type="submit" class="btn btn-primary btn-lg"
						disabled>
					Coming soon
				</button>
			</form>
		</div>

		<div>
			<h3>Import from current users</h3>

			<div v-if="residents && residents.length > 0"
					class="row user-type-container">
				<div class="col-sm-8 col-sm-offset-2">
					<h4>Residents</h4>
					<component-list :items="residents"
							:fields="['full_name', 'training_level']">
						<template slot-scope="user">
							<div class="row import-user-row">
								<label class="containing-label">
									<div class="col-sm-1">
										<input type="checkbox" :value="user.id"
											v-model="usersToImport" />
									</div>
									<div class="col-sm-6">
										{{ user.full_name }}
									</div>
									<div class="col-sm-5">
										{{ renderTrainingLevel(user.training_level) }}
									</div>
								</label>
							</div>
						</template>
					</component-list>

					<div v-if="selectedResidents && selectedResidents.length > 0"
							class="row">
						<div class="col-sm-8 col-sm-offset-2">
							<div class="selected-users-panel panel panel-default">
								<div class="panel-heading">
									<div class="panel-title">
										Selected residents
									</div>
								</div>
								<div class="panel-body">
									<ul>
										<li v-for="user of selectedResidents">
											{{ user.full_name }}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="fellows && fellows.length > 0"
					class="row user-type-container">
				<div class="col-sm-8 col-sm-offset-2">
					<h4>Fellows</h4>
					<component-list :items="fellows"
							:fields="['full_name', 'secondary_training_level']">
						<template slot-scope="user">
							<div class="row import-user-row">
								<label class="containing-label">
									<div class="col-sm-1">
										<input type="checkbox" :value="user.id"
											v-model="usersToImport" />
									</div>
									<div class="col-sm-6">
										{{ user.full_name }}
									</div>
									<div class="col-sm-5">
										{{ renderSecondaryTrainingLevel(user.secondary_training_level) }}
									</div>
								</label>
							</div>
						</template>
					</component-list>

					<div v-if="selectedFellows && selectedFellows.length > 0"
							class="row">
						<div class="col-sm-8 col-sm-offset-2">
							<div class="selected-users-panel panel panel-default">
								<div class="panel-heading">
									<div class="panel-title">
										Selected fellows
									</div>
								</div>
								<div class="panel-body">
									<ul>
										<li v-for="user of selectedFellows">
											{{ user.full_name }}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="faculty && faculty.length > 0"
					class="row user-type-container">
				<div class="col-sm-8 col-sm-offset-2">
					<h4>Faculty</h4>
					<component-list :items="faculty" :fields="['full_name']">
						<template slot-scope="user">
							<div class="row import-user-row">
								<label class="containing-label">
									<div class="col-sm-1 col-sm-offset-2">
										<input type="checkbox" :value="user.id"
											v-model="usersToImport" />
									</div>
									<div class="col-sm-7">
										{{ user.full_name }}
									</div>
								</label>
							</div>
						</template>
					</component-list>

					<div v-if="selectedFaculty && selectedFaculty.length > 0"
							class="row">
						<div class="col-sm-8 col-sm-offset-2">
							<div class="selected-users-panel panel panel-default">
								<div class="panel-heading">
									<div class="panel-title">
										Selected faculty
									</div>
								</div>
								<div class="panel-body">
									<ul>
										<li v-for="user of selectedFaculty">
											{{ user.full_name }}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="selectedUsers && selectedUsers.length > 0"
					class="summary-container">

				<div class="row">
					<div class="col-sm-8 col-sm-offset-2">
						<div class="selected-users-panel panel panel-default">
							<div class="panel-heading">
								<div class="panel-title">
									Selected users
								</div>
							</div>
							<div class="panel-body">
								<ul>
									<li v-for="user of selectedUsers">
										{{ user.full_name }}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-8 col-sm-offset-2">
						<label class="containing-label">
							Graduation date for imported users
							<vue-flatpickr :options="flatpickrOptions"
								v-model="graduationDate" />
						</label>
					</div>
				</div>

				<div class="btn-lg-submit-container text-center">
					<confirmation-button class="btn btn-lg"
							unpressed-class="btn-default"
							pressed-class="btn-warning"
							@click="$emit('close')">
						Cancel
					</confirmation-button>
					<confirmation-button class="btn btn-lg"
							unpressed-class="btn-primary"
							pressed-class="btn-success"
							@click="importUsers">
						Import
					</confirmation-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VueFlatpickr from '@jacobmischka/vue-flatpickr';

import ComponentList from '@/vue-components/ComponentList.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';

import {
	renderTrainingLevel,
	renderSecondaryTrainingLevel
} from '@/modules/datatable-utils.js';
import { emitError } from '@/modules/errors.js';
import { isoDateString, currentYear } from '@/modules/date-utils.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';

export default {
	data() {
		return {
			residents: [],
			fellows: [],
			faculty: [],

			graduationDate: isoDateString(currentYear().endDate),
			usersToImport: []
		};
	},

	computed: {
		flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: 'form-control appear-not-readonly'
			};
		},
		selectedResidents() {
			return this.residents.filter(resident =>
				this.usersToImport.includes(resident.id));
		},
		selectedFellows() {
			return this.fellows.filter(user =>
				this.usersToImport.includes(user.id));
		},
		selectedFaculty() {
			return this.faculty.filter(user =>
				this.usersToImport.includes(user.id));
		},
		selectedUsers() {
			return [].concat(
				this.selectedResidents,
				this.selectedFellows,
				this.selectedFaculty
			);
		}
	},

	mounted() {
		this.fetchUsers();
	},

	methods: {
		renderTrainingLevel,
		renderSecondaryTrainingLevel,
		fetchUsers() {
			this.fetchResidents();
			this.fetchFellows();
			this.fetchFaculty();
		},
		fetchResidents() {
			let query = $.param({
				type: 'resident',
				training_level: [
					'intern',
					'ca-1',
					'ca-2',
					'ca-3'
				]
			});

			fetch(`/users?${query}`, {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(users => {
				this.residents = users;
			}).catch(err => {
				emitError(err, this, 'There was a problem fetching residents');
			});
		},
		fetchFellows() {
			let query = $.param({
				type: 'resident',
				training_level: 'fellow'
			});

			fetch(`/users?${query}`, {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(users => {
				this.fellows = users;
			}).catch(err => {
				emitError(err, this, 'There was a problem fetching fellows');
			});
		},
		fetchFaculty() {
			let query = $.param({
				type: 'faculty'
			});

			fetch(`/users?${query}`, {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(users => {
				this.faculty = users;
			}).catch(err => {
				emitError(err, this, 'There was a problem fetching faculty');
			});
		},
		importUsers() {
			fetch('/alumni/import/users', {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					users: this.usersToImport,
					graduation_date: this.graduationDate
				})
			}).then(jsonOrThrow).then(response => {
				if (response.successes && response.successes.length > 0) {
					let lis = response.successes.map(userId => {
						let user = this.selectedUsers.find(user =>
							user.id === userId);
						return `<li>${user.full_name}</li>`;
					});
					this.$emit('alert', {
						type: 'success',
						html: `Imported successfully: <ul>
							${lis.join(' ')}
						</ul>`
					});
					this.$emit('alert', {
						type: 'info',
						text: "Please don't forget to close the accounts of any leaving users!"
					});
				}

				if (response.notFound && response.notFound.length > 0) {
					let lis = response.notFound.map(userId => {
						let user = this.selectedUsers.find(user =>
							user.id === userId);
						return `<li>${user.full_name}</li>`;
					});
					this.$emit('alert', {
						type: 'warning',
						html: `Users not found: <ul>
							${lis.join(' ')}
						</ul>`
					});
				}

				if (response.errors && response.errors.length > 0) {
					let lis = response.errors.map(userId => {
						let user = this.selectedUsers.find(user =>
							user.id === userId);
						return `<li>${user.full_name}</li>`;
					});
					this.$emit('alert', {
						type: 'error',
						html: `Not successfully imported: <ul>
							${lis.join(' ')}
						</ul>`
					});
				} else {
					this.$emit('reload');
					this.$emit('close');
				}
			}).catch(err => {
				emitError(err, this, 'There was a problem importing alumni');
			});
		}
	},

	components: {
		VueFlatpickr,
		ComponentList,
		ConfirmationButton
	}
};
</script>

<style scoped>
	.import-user-row {
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}

	.import-user-row:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.import-user-row .containing-label {
		padding-top: 5px;
	}

	.user-type-container,
	.summary-container{
		margin-top: 3em;
	}

	.selected-users-panel {
		margin-top: 1em;
	}

	.selected-users-panel .panel-body {
		max-height: 300px;
		overflow-y: auto;
	}
</style>
