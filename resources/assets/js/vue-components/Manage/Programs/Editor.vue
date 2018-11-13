<template>
	<form @submit="handleSubmit">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="panel-title">
					Edit program
				</span>
			</div>
			<div class="panel-body">
				<div class="form">
					<div class="form-group col-sm-6">
						<label>
							Name
							<input type="text" class="form-control" v-model="name" />
						</label>
					</div>
					<div class="form-group col-sm-6">
						<label>
							Type
							<select class="form-control" v-model="type">
								<option v-for="typeOption of types" :value="typeOption">
									{{ ucfirst(typeOption) }}
								</option>
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
import { renderTrainingLevel } from '@/modules/datatable-utils.js';
import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		initialValue: {
			type: Object,
			required: false
		}
	},
	data() {
		const data = {
			name: '',
			type: 'resident',
			training_level: null,
			secondary_training_level: null,

			types: [
				'resident',
				'fellow',
				'self'
			],

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

	watch: {
		initialValue(initialValue) {
			Object.assign(this, initialValue);
		}
	},

	methods: {
		renderTrainingLevel,
		ucfirst,
		handleSubmit(event) {
			event.preventDefault();

			this.$emit('submit',
				{
					name: this.name,
					type: this.type,
					training_level: this.training_level,
					secondary_training_level: this.secondary_training_level
				}
			);
		},
		handleCancel() {
			this.$emit('cancel');
		}
	}
};
</script>
