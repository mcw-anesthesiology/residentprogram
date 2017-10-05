<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="errors" prop="title">
			<label class="containing-label">
				Lecture title
				<textarea class="form-control"
					:value="title" :readonly="readonly"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="errors" prop="date">
			<label class="containing-label">
				Lecture date
				<vue-flatpickr class="form-control"
					:options="flatpickrOptions"
					:value="date"
					@input="$emit('input', {date: arguments[0]})" />
			</label>
		</validated-form-group>
		<validated-form-group v-if="type !== 'audienceLecture'"
				:errors="errors" prop="audience">
			<label class="containing-label">
				Lecture audience (department, society, group, location, etc.)
				<textarea class="form-control"
					:value="audience" :readonly="readonly"
					@input="$emit('input', {audience: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import VueFlatpickr from 'vue-flatpickr';
import 'flatpickr/dist/flatpickr.css';

import { lectureListItem as validate } from 'modules/questionnaire/validate.js';

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
		flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: this.readonly
					? 'form-control'
					: 'form-control appear-not-readonly',
				altFormat: 'M j, Y',
				clickOpens: !this.readonly
			};
		},
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
		VueFlatpickr
	}
};
</script>
