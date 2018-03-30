<template>
	<form class="highlighted-question-editor" @submit="handleSubmit">
		<div class="panel panel-info">
			<div class="panel-heading">
				<span class="panel-title">
					Highlighted Question editor
				</span>
			</div>
			<div class="panel-body">
				<validated-form-group :errors="errors" prop="highlightName">
					<label class="containing-label control-label">
						Highlight name
						<input type="text" class="form-control"
							v-model="highlightName" />
					</label>
				</validated-form-group>
			</div>
			<div class="panel-footer text-right">
				<button type="button" class="btn btn-default"
						@click="$emit('close')">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary"
						:disabled="!valid">
					Save
				</button>
			</div>
		</div>
	</form>
</template>

<style scoped>
	.highlighted-question-editor {
		width: 80%;
		margin: auto;
	}
</style>

<script>
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

export default {
	props: {
		highlight_name: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			highlightName: this.highlight_name
		};
	},
	computed: {
		errors() {
			const errors = new Map();

			if (!this.highlightName) {
				errors.set(
					'highlightName',
					'Please enter a name for the highlighted question'
				);
			}

			return errors;
		},
		valid() {
			return this.errors.size === 0;
		}
	},
	methods: {
		handleSubmit(event) {
			event.preventDefault();

			if (!this.valid)
				return;

			this.$emit('submit', {
				highlight_name: this.highlightName
			});
		}
	},
	components: {
		ValidatedFormGroup
	}
};
</script>
