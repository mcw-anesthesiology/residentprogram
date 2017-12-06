<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="title"
				:errors="errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Lecture title
				<textarea class="form-control"
					:value="title"
					:readonly="isReadonly('title')"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="date"
				:errors="errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<multiple-unknown-date-selector
					:value="date"
					:readonly="isReadonly('date')"
					@input="$emit('input', {date: arguments[0]})">
				Lecture date
			</multiple-unknown-date-selector>
		</validated-form-group>
		<validated-form-group prop="audience"
				:errors="errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Lecture audience (department, society, group, location, etc.)
				<textarea class="form-control"
					:value="audience"
					:readonly="isReadonly('audience')"
					@input="$emit('input', {audience: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import MultipleUnknownDateSelector from '@/vue-components/MultipleUnknownDateSelector.vue';

import { lectureListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return [
					'lecture',
					'audienceLecture'
				].includes(type);
			}
		},
		title: {
			type: String,
			default: ''
		},
		date: {
			type: String,
			default: ''
		},
		audience: {
			type: String,
			default: ''
		}
	},

	computed: {
		validation() {
			return validate(this);
		},
		errors() {
			return this.validation
				? this.validation.errors
				: new Map();
		}
	},

	components: {
		ListItem,
		MultipleUnknownDateSelector
	}
};
</script>
