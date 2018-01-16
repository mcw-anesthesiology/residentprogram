<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<div class="panel-title">
				{{ this.editing ? 'Edit' : 'Add' }} Location
			</div>
		</div>
		<div class="panel-body">
			<form>
				<div class="form-group">
					<label class="containing-label">
						Name
						<input type="text" class="form-control" v-model="newName" />
					</label>
				</div>
			</form>
		</div>
		<div class="panel-footer">
			<button type="button" class="btn btn-default"
					@click="$emit('close')">
				Cancel
			</button>
			<button type="button" class="btn btn-info"
					@click="handleSubmit">
				Save
			</button>
		</div>
	</div>
</template>

<script>
import { emitError } from '@/modules/errors.js';
import { fetchConfig, okOrThrow } from '@/modules/utils.js';

export default {
	props: {
		id: {
			type: Number,
			required: false
		},
		name: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			newName: this.name
		};
	},

	computed: {
		editing() {
			return Boolean(this.id);
		}
	},

	methods: {
		handleSubmit() {
			const url = this.editing
				? `/locations/${this.id}`
				: '/locations';

			const body = {
				name: this.newName
			};

			if (this.editing)
				body._method = 'PATCH';

			fetch(url, {
				...fetchConfig(),
				method: 'POST', // maybe PATCH
				body: JSON.stringify(body)
			}).then(okOrThrow).then(() => {
				this.$emit('submit');
			}).catch(err => {
				emitError(err, this, 'There was a problem saving the location');
			});
		}
	}
};
</script>
