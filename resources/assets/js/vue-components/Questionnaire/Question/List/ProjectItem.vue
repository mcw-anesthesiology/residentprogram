<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="validation.errors" prop="description">
			<label class="containing-label">
				{{ descriptionLabel }}
				<textarea class="form-control"
					:value="description" :readonly="readonly"
					@input="$emit('input', {description: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="hours">
			<label class="containing-label">
				{{ hoursLabel }}
				<input type="number" class="form-control"
					:value="hours" :readonly="readonly"
					@input="$emit('input', {hours: Number($event.target.value)})" />
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { projectListItem as validate } from '@/modules/questionnaire/validate.js';

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
		hours: {
			type: Number,
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
				: 'Description of the project and your involvement';
		},
		hoursLabel() {
			return (this.labels && this.labels.reviews)
				? this.labels.reviews
				: 'Number of hours spent';
		},
		validation() {
			return validate(this);
		}
	},

	components: {
		ListItem
	}
};
</script>
