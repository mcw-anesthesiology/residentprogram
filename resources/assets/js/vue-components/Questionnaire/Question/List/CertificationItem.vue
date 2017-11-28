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
		<validated-form-group prop="current"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				<input type="checkbox"
					:checked="current"
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
			return validate(this);
		},
		flatpickrOptions() {
			const { startDate, endDate } = isoDateStringObject(currentYear());
			return {
				altInput: true,
				altInputClass: this.readonly
					? 'form-control'
					: 'form-control appear-not-readonly',
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
