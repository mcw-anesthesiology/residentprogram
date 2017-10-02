<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="validation.errors" prop="mentee">
			<label class="containing-label">
				{{ menteeLabel }}
				<input type="text" class="form-control"
					:value="mentee" :readonly="readonly"
					@input="$emit('input', {mentee: $event.target.value})" />
			</label>
			<span v-if="!mentee" class="help-block">
				Please enter the mentee / trainee name or remove this list item
			</span>
		</validated-form-group>
		<validated-form-group v-if="type !== 'subjectMentorship'"
				:errors="validation.errors" prop="subject">
			<label class="containing-label">
				{{ subjectLabel }}
				<textarea class="form-control"
					:value="subject" :readonly="readonly"
					@input="$emit('input', {subject: $event.target.value})">
				</textarea>
			</label>
			<span v-if="!subject" class="help-block">
				Please enter the mentorship subject or remove this list item
			</span>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { mentorshipListItem as validate } from 'modules/questionnaire/validate.js';

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
