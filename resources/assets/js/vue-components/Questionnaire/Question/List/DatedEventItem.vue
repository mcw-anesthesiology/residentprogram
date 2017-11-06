<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group prop="description"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				{{ descriptionLabel }}
				<textarea class="form-control"
					:value="description" :readonly="readonly"
					@input="$emit('input', {description: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="date"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<multiple-unknown-date-selector
					:value="date"
					:readonly="readonly"
					@input="$emit('input', {date: arguments[0]})">
				{{ dateLabel }}
			</multiple-unknown-date-selector>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import MultipleUnknownDateSelector from '@/vue-components/MultipleUnknownDateSelector.vue';

import { datedEventListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'project';
			}
		},
		description: {
			type: String,
			default: ''
		},
		date: {
			type: String,
			default: 0
		},
		labels: {
			type: Object,
			required: false
		}
	},

	computed: {
		descriptionLabel() {
			return (this.labels && this.labels.description)
				? this.labels.description
				: 'Description of the event and your involvement';
		},
		dateLabel() {
			return (this.labels && this.labels.dateLabel)
				? this.labels.dateLabel
				: 'Date(s) the event took place';
		},
		validation() {
			return validate(this);
		}
	},

	components: {
		ListItem,
		MultipleUnknownDateSelector
	}
};
</script>
