<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !name}">
			<label class="containing-label">
				Committee name
				<textarea class="form-control"
					:value="name" :readonly="readonly"
					@input="$emit('input', {name: $event.target.value})">
				</textarea>
			</label>
			<span v-if="!name" class="help-block">
				Please enter the committee name or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !role}">
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

			<span v-if="!role" class="help-block">
				Please select your role or remove this list item
			</span>
		</div>
	</list-item>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';

import { ucfirst } from 'modules/utils.js';

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

	methods: {
		ucfirst
	},

	components: {
		ConfirmationButton
	}
};
</script>
