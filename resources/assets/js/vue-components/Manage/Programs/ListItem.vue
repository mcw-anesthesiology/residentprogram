<template>
	<section class="component-list-item" :key="program.id">
		<div class="row">
			<div class="col-xs-3">
				<span>{{ program.name }}</span>
			</div>
			<div class="col-xs-2">
				<span>{{ ucfirst(program.type) }}</span>
			</div>
			<div class="col-xs-2">
				<span>{{ renderTrainingLevel(program.training_level) }}</span>
			</div>
			<div class="col-xs-2">
				<span>{{ renderSecondaryTrainingLevel(program.secondary_training_level) }}</span>
			</div>
			<div class="col-xs-3">
				<router-link :to="`edit/${program.id}`" class="btn btn-sm btn-info">
					<span class="glyphicon glyphicon-pencil"></span>
					Edit
				</router-link>
				<confirmation-button class="btn btn-sm btn-danger" @click="handleDelete">
					<span class="glyphicon glyphicon-remove"></span>
					Delete
				</confirmation-button>
			</div>
		</div>
		<details class="administrators-details">
			<summary>Administrators</summary>

			<div class="row">
				<div class="col-sm-6">
					<ul class="list-group">
						<li v-for="administrator of program.administrators" :key="administrator.id"
								class="list-group-item admin-item">
							<span>
								{{ administrator.full_name }}
							</span>
							<confirmation-button class="btn btn-sm btn-danger"
									@click="handleAdministratorRemove(administrator.id)">
								<span class="glyphicon glyphicon-remove"></span>
								Remove
							</confirmation-button>
						</li>
					</ul>
				</div>
				<div class="col-sm-6">
					<form @submit="handleAdministratorAdd">
						<div class="row">
							<div class="col-xs-8">
								<div class="form-group">
									<label>
										New administrator
										<user-select v-model="newAdminId" />
									</label>
								</div>
							</div>
							<div class="col-xs-4 text-right">
								<div class="labelless-button">
									<button type="submit" class="btn btn-primary"
											:disabled="!newAdminId">
										<span class="glyphicon glyphicon-plus"></span>
										Add
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</details>
	</section>
</template>

<style>
	.administrators-details {
		padding: 0 2em;
	}

	.administrators-details > summary {
		display: list-item;
		cursor: pointer;
		font-size: 1.1em;
		margin-bottom: 1em;
	}

	.admin-item {
		display: flex;
		justify-content: space-between;
	}
</style>

<script>
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import UserSelect from '@/vue-components/UserSelect.vue';

import { emitError } from '@/modules/errors.js';
import {
	renderTrainingLevel,
	renderSecondaryTrainingLevel
} from '@/modules/datatable-utils.js';
import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		program: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			newAdminId: null
		};
	},
	methods: {
		ucfirst,
		renderTrainingLevel,
		renderSecondaryTrainingLevel,
		handleDelete() {
			this.$store.dispatch('programs/delete', this.program.id).catch(err => {
				emitError(err, this, 'There was a problem deleting the program');
			});
		},
		handleAdministratorAdd(event) {
			event.preventDefault();

			this.$store.dispatch('programs/addAdministrator', {
				id: this.program.id,
				userId: this.newAdminId
			}).then(() => {
				this.newAdminId = null;
			}).catch(err => {
				emitError(err, this, 'There was a problem adding the administrator');
			});
		},
		handleAdministratorRemove(userId) {
			this.$store.dispatch('programs/removeAdministrator', {
				id: this.program.id,
				userId
			}).catch(err => {
				emitError(err, this, 'There was a problem removing the administrator');
			});
		}
	},
	components: {
		ConfirmationButton,
		UserSelect
	}
};
</script>
