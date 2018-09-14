<template>
	<form @submit="handleSubmit">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="panel-title">
					Edit program administrator
				</span>
			</div>
			<div class="panel-body">
				<div class="form">
					<div class="form-group col-sm-6">
						<label>
							User
							<select-two class="form-control" :options="users" v-model="user_id" />
						</label>
					</div>
					<div class="form-group col-sm-6">
						<label>
							Type
							<select class="form-control" v-model="type">
								<option value="resident">Trainee</option>
							</select>
						</label>
					</div>
					<div class="form-group col-sm-6">
						<label>
							Training level
							<select class="form-control" v-model="training_level">
								<option v-for="trainingLevel of trainingLevels" :value="trainingLevel">
								{{ renderTrainingLevel(trainingLevel) }}
								</option>
							</select>
						</label>
					</div>
					<div class="form-group col-sm-6">
						<label>
							Secondary training level
							<input type="text" class="form-control" v-model="secondary_training_level" />
						</label>
					</div>
				</div>
			</div>
			<div class="panel-footer">
				<button type="submit" class="btn btn-primary">Submit</button>
				<button type="button" class="btn btn-default" @click="handleCancel">Cancel</button>
			</div>
		</div>
	</form>
</template>

<script>
import { mapGetters } from 'vuex';

import SelectTwo from '@/vue-components/SelectTwo.vue';

import { renderTrainingLevel } from '@/modules/datatable-utils.js';

export default {
	props: {
		initialValue: {
			type: Object,
			required: false
		}
	},
	data() {
		const data = {
			user_id: null,
			type: 'resident',
			training_level: null,
			secondary_training_level: null,

			trainingLevels: [
				'intern',
				'resident',
				'ca-2',
				'ca-1',
				'ca-3',
				'fellow'
			]
		};

		if (this.initialValue)
			Object.assign(data, this.initialValue);

		return data;
	},

	mounted() {
		this.$store.dispatch('fetchUsers');
	},

	computed: mapGetters({
		users: 'groupedUsers'
	}),

	watch: {
		initialValue(initialValue) {
			Object.assign(this, initialValue);
		}
	},

	methods: {
		renderTrainingLevel,
		handleSubmit(event) {
			event.preventDefault();

			this.$emit('submit',
				{
					user_id: this.user_id,
					type: this.type,
					training_level: this.training_level,
					secondary_training_level: this.secondary_training_level
				}
			);
		},
		handleCancel() {
			this.$emit('cancel');
		}
	},

	components: {
		SelectTwo
	}
};
</script>
