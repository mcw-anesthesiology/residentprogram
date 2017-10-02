<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="validation.errors" prop="name">
			<label class="containing-label">
				Committee name
				<textarea class="form-control"
					:value="name" :readonly="readonly"
					@input="$emit('input', {name: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="role">
			<fieldset>
				<legend>
					Your role
				</legend>
			</fieldset>
			<label v-for="value of ['chair', 'member']" class="containing-label">
				<input type="radio" :value="value"
					:checked="role === value"
					@change="$emit('input', {role: $event.target.value})" />
				{{ ucfirst(value) }}
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';

import { ucfirst } from 'modules/utils.js';
import { committeeListItem as validate } from 'modules/questionnaire/validate.js';

export default {
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'committee';
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
		readonly: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		validation() {
			return validate(this);
		}
	},

	methods: {
		ucfirst
	},

	components: {
		ConfirmationButton
	}
};
</script>
