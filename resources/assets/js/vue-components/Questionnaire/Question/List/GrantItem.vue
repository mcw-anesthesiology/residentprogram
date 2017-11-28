<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="agency"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Funding agency
				<suggestable-text-input
					:value="agency"
					:suggestions="suggestions.agency"
					:readonly="isReadonly('agency')"
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
					:readonly="isReadonly('project')"
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
						:value="amount"
						:readonly="isReadonly('amount')"
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
