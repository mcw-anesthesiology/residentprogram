<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !journal}">
			<label class="containing-label">
				Journal
				<input type="text" class="form-control"
					:value="journal" :readonly="readonly"
					@input="$emit('input', {journal: $event.target.value})" />
			</label>
			<span v-if="!journal" class="help-block">
				Please enter the journal name or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !role}">
			<fieldset class="radio-question">
				<legend>
					Role
				</legend>
				<div class="options">
					<label v-for="predefinedRole of predefinedRoles">
						<input type="radio" :value="predefinedRole"
							:checked="role === predefinedRole"
							:disabled="readonly"
							@change="handleCheck" />
						{{ kebabCaseToWords(predefinedRole) }}
					</label>

					<label>
						<input type="radio" :value="otherRole"
							:checked="role === otherRole"
							:disabled="readonly"
							@change="handleCheck" />
						<input type="text"
							class="form-control editable-option-text"
							placeholder="Other"
							:readonly="readonly"
							v-model="otherRole"
							@click="handleOtherCheck" />
					</label>
				</div>
			</fieldset>
			<span v-if="!role" class="help-block">
				Please select a role or remove this list item
			</span>
		</div>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { kebabCaseToWords } from 'modules/utils.js';

const predefinedRoles = [
	'editor-in-chief',
	'associate-editor',
	'executive-editor',
	'statistical-editor'
];

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'editorialBoard';
			}
		},
		journal: {
			type: String,
			default: ''
		},
		role: {
			type: String
		}
	},
	data() {
		return {
			otherRole: predefinedRoles.includes(this.role)
				? ''
				: this.role
		};
	},

	computed: {
		predefinedRoles() {
			return predefinedRoles;
		}
	},

	watch: {
		otherRole(otherRole) {
			this.$emit('input', {role: otherRole});
		}
	},

	methods: {
		kebabCaseToWords,
		handleCheck(event) {
			if (this.readonly)
				return;

			this.$emit('input', {role: event.target.value});
		},
		handleOtherCheck() {
			if (this.readonly)
				return;

			this.$emit('input', {role: this.otherRole});
		}
	},

	components: {
		ListItem
	}
};
</script>

<style scoped>
	.radio-question {
		font-size: 1.25em;
	}

	legend {
		margin: 0;
	}

	.options {
		display: flex;
		flex-wrap: wrap;
	}

	.options label {
		padding: 1em;
	}

	.editable-option-text {
		display: inline-block;
		width: auto;
	}
</style>
