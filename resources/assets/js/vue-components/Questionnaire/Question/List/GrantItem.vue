<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group v-if="type === 'grantOther'" prop="agency"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Funding agency
				<suggestable-text-input
					:value="agency"
					:suggestions="suggestions.agency"
					:readonly="readonly"
					@input="$emit('input', {agency: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="project"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Project
				<suggestable-text-input
					:value="project"
					:suggestions="suggestions.project"
					:readonly="readonly"
					@input="$emit('input', {project: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="amount"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Funding amount
				<div class="input-group">
					<span class="input-group-addon">$</span>
					<input type="number" class="form-control"
						:value="amount" :readonly="readonly"
						@input="$emit('input', {amount: Number($event.target.value)})" />
				</div>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import SuggestableTextInput from '@/vue-components/SuggestableTextInput.vue';

import { grantListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return [
					'grant',
					'grantOther'
				].includes(type);
			}
		},
		suggestions: {
			type: Object,
			required: false,
			default() {
				return {};
			}
		},
		agency: {
			type: String,
			default: ''
		},
		project: {
			type: String,
			default: ''
		},
		amount: {
			type: Number,
			default: 0
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
