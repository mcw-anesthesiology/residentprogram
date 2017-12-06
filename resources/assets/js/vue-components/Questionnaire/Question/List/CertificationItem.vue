<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="board"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Board
				<suggestable-text-input
					:value="board"
					:suggestions="suggestions.board"
					:readonly="isReadonly('board')"
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
					:readonly="isReadonly('specialty')"
					@input="$emit('input', {specialty: arguments[0]})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="current"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				<input type="checkbox"
					:checked="current"
					:disabled="isReadonly('current')"
					@change="$emit('input', {current: $event.target.checked})" />
				Current
			</label>
		</validated-form-group>
		<validated-form-group prop="recertified"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Recertification date (if in current academic year)
				<clearable-date input-class="form-control"
					:options="flatpickrOptions"
					:value="recertified"
					@input="$emit('input', {recertified: arguments[0]})" />
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import ClearableDate from '@/vue-components/ClearableDate.vue';
import SuggestableTextInput from '@/vue-components/SuggestableTextInput.vue';

import { certificationListItem as validate } from '@/modules/questionnaire/validate.js';
import { currentYear, isoDateStringObject } from '@/modules/date-utils.js';

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
		current: {
			type: Boolean,
			default: false
		},
		recertified: {
			type: String,
			required: false
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
			return validate(this, this.propsRequired);
		},
		flatpickrOptions() {
			const { startDate, endDate } = isoDateStringObject(currentYear());
			return {
				altInput: true,
				altInputClass: this.isReadonly('recertified')
					? 'form-control'
					: 'form-control appear-not-readonly',
				clickOpens: !this.isReadonly('recertified'),
				altFormat: 'M j, Y',
				minDate: startDate,
				maxDate: endDate
			};
		}
	},

	components: {
		ListItem,
		ClearableDate,
		SuggestableTextInput
	}
};
</script>
