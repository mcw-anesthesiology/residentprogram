<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="mentee"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				{{ menteeLabel }}
				<input type="text" class="form-control"
					:value="mentee"
					:readonly="isReadonly('mentee')"
					@input="$emit('input', {mentee: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="subject"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				{{ subjectLabel }}
				<textarea class="form-control"
					:value="subject"
					:readonly="isReadonly('subject')"
					@input="$emit('input', {subject: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { mentorshipListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return [
					'mentorship',
					'subjectMentorship'
				].includes(type);
			}
		},
		mentee: {
			type: String,
			default: ''
		},
		subject: {
			type: String,
			default: ''
		},
		labels: {
			type: Object,
			required: false
		}
	},

	computed: {
		menteeLabel() {
			return (this.labels && this.labels.mentee)
				? this.labels.mentee
				: 'Mentee name';
		},
		subjectLabel() {
			return (this.labels && this.labels.subject)
				? this.labels.subject
				: 'Project / program / mentorship subject';
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
