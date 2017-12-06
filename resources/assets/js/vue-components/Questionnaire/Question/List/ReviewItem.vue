<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="work"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				{{ workLabel }}
				<textarea class="form-control"
					:value="work"
					:readonly="isReadonly('work')"
					@input="$emit('input', {work: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="reviews"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				{{ reviewsLabel }}
				<input type="number" class="form-control"
					:value="reviews"
					:readonly="isReadonly('reviews')"
					@input="$emit('input', {reviews: Number($event.target.value)})" />
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { reviewListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'review';
			}
		},
		work: {
			type: String,
			default: ''
		},
		reviews: {
			type: Number,
			default: 0
		},
		labels: {
			type: Object,
			required: false
		}
	},

	computed: {
		workLabel() {
			return (this.labels && this.labels.work)
				? this.labels.work
				: "What's being reviewed";
		},
		reviewsLabel() {
			return (this.labels && this.labels.reviews)
				? this.labels.reviews
				: 'Number of reviews';
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
