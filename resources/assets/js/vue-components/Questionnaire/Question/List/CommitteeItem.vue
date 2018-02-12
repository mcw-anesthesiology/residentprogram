<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="name"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<suggestable-text-input
				:label="labels.name || 'Committee name'"
				:value="name"
				:readonly="isReadonly('name')"
				:suggestions="suggestions.name"
				@input="$emit('input', {name: arguments[0]})" />
		</validated-form-group>
		<validated-form-group prop="role"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<fieldset>
				<legend class="control-label">
					{{ labels.role || 'Your role' }}
				</legend>
			</fieldset>
			<div class="options">
				<label v-for="value of POSSIBLE_ROLES"
						class="control-label">
					<input type="radio" :value="value"
						:checked="role === value"
						:disabled="isReadonly('role')"
						@change="$emit('input', {role: $event.target.value})" />
					{{ ucfirst(value) }}
				</label>
			</div>
		</validated-form-group>
		<validated-form-group prop="meetingsPerYear"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label control-label">
				{{ labels.meetingsPerYear || 'Meetings per year' }}
				<input type="number" class="form-control"
					:value="meetingsPerYear"
					:readonly="isReadonly('meetingsPerYear')"
					@input="$emit('input', {meetingsPerYear: Number($event.target.value)})" />
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import SuggestableTextInput from '@/vue-components/SuggestableTextInput.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';

import { ucfirst } from '@/modules/utils.js';
import { committeeListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'committee';
			}
		},
		labels: {
			type: Object,
			required: false,
			default() {
				return {};
			}
		},
		suggestions: {
			type: Object,
			required: false,
			default() {
				return {};
			}
		},
		name: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		meetingsPerYear: {
			type: Number,
			default: 0
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		POSSIBLE_ROLES() {
			return [
				'chair',
				'member'
			];
		},
		validation() {
			return validate(this);
		}
	},

	methods: {
		ucfirst
	},

	components: {
		ListItem,
		SuggestableTextInput,
		ConfirmationButton
	}
};
</script>

<style scoped>
	.options {
		display: flex;
		flex-wrap: wrap;
	}

	.options label {
		padding: 1em;
	}
</style>
