<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="validation.errors" prop="text">
			<textarea class="form-control"
				:value="text" :readonly="readonly"
				@input="$emit('input', {text: $event.target.value})">
			</textarea>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { textListItem as validate } from 'modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	model: {
		prop: 'text'
	},
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'text';
			}
		},
		text: {
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

	components: {
		ListItem
	}
};
</script>
