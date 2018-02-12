<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="text"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<suggestable-text-input
				:label="labels.text"
				:value="text"
				:suggestions="suggestions.text"
				:readonly="isReadonly('text')"
				@input="$emit('input', {text: arguments[0]})" />
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import SuggestableTextInput from '@/vue-components/SuggestableTextInput.vue';

import { textListItem as validate } from '@/modules/questionnaire/validate.js';

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
		suggestions: {
			type: Object,
			default() {
				return {};
			}
		},
		labels: {
			type: Object,
			default() {
				return {};
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
		ListItem,
		SuggestableTextInput
	}
};
</script>
