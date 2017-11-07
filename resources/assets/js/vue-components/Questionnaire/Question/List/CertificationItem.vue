<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group prop="board"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Board
				<suggestable-text-input
					:value="board"
					:suggestions="suggestions.board"
					:readonly="readonly"
					@input="$emit('input', {board: arguments[0]})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="specialty"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Specialty
				<suggestable-text-input
					:value="specialty"
					:suggestions="suggestions.specialty"
					:readonly="readonly"
					@input="$emit('input', {specialty: arguments[0]})" />
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import SuggestableTextInput from '@/vue-components/SuggestableTextInput.vue';

import { certificationListItem as validate } from '@/modules/questionnaire/validate.js';

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
		},
		suggestions: {
			type: Object,
			default() {
				return {};
			}
		}
	},

	computed: {
		validation() {
			return validate(this);
		}
	},

	components: {
		ListItem,
		SuggestableTextInput
	}
};
</script>
