<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="validation.errors" prop="board">
			<label class="containing-label">
				Board
				<input type="text" class="form-control"
					:value="board" :readonly="readonly"
					@input="$emit('input', {board: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="specialty">
			<label class="containing-label">
				Specialty
				<textarea class="form-control"
					:value="specialty" :readonly="readonly"
					@input="$emit('input', {specialty: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { certificationListItem as validate } from 'modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'certification';
			}
		},
		board: {
			type: String,
			default: ''
		},
		specialty: {
			type: String,
			default: ''
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
