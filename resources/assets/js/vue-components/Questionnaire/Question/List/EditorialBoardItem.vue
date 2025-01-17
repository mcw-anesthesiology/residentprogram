<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="journal"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Journal
				<input type="text" class="form-control"
					:value="journal"
					:readonly="isReadonly('journal')"
					@input="$emit('input', {journal: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="role"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<fieldset class="radio-question">
				<legend>
					Role
				</legend>
				<div class="options">
					<label v-for="predefinedRole of predefinedRoles">
						<input type="radio" :value="predefinedRole"
							:checked="role === predefinedRole"
							:disabled="isReadonly('role')"
							@change="handleCheck" />
						{{ kebabCaseToWords(predefinedRole) }}
					</label>

					<label>
						<input type="radio" :value="otherRole"
							:checked="role === otherRole"
							:disabled="isReadonly('role')"
							@change="handleCheck" />
						<input type="text"
							class="form-control editable-option-text"
							placeholder="Other"
							:readonly="isReadonly('role')"
							v-model="otherRole"
							@click="handleOtherCheck" />
					</label>
				</div>
			</fieldset>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { kebabCaseToWords } from '@/modules/utils.js';
import { editorialBoardListItem as validate } from '@/modules/questionnaire/validate.js';

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
		},
		validation() {
			return validate(this);
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
