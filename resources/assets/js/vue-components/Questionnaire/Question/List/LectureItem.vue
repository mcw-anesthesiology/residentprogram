<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group prop="title"
				:errors="errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Lecture title
				<textarea class="form-control"
					:value="title" :readonly="readonly"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="date"
				:errors="errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Lecture date
				<input v-if="dateUnknown" type="text" class="form-control"
					:value="date" readonly />
				<vue-flatpickr v-else class="form-control"
					:key="`multiple-${multipleDates}`"
					:options="flatpickrOptions"
					:value="date"
					@input="$emit('input', {date: arguments[0]})" />
			</label>
			<div class="checkbox-label-container">
				<label class="checkbox-label">
					<input type="checkbox" v-model="multipleDates"
						:disabled="readonly || dateUnknown" />
					Multiple
				</label>
				<label class="checkbox-label">
					<input type="checkbox" v-model="dateUnknown"
						:disabled="readonly" />
					Unknown date
				</label>
			</div>
		</validated-form-group>
		<validated-form-group v-if="type !== 'audienceLecture'" prop="audience"
				:errors="errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
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
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import 'flatpickr/dist/flatpickr.css';

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

	data() {
		return {
			multipleDates: Boolean(this.date && this.date.includes(';')),
			dateUnknown: Boolean(this.date && this.date === 'Unknown')
		};
	},

	computed: {
		flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: this.readonly
					? 'form-control'
					: 'form-control appear-not-readonly',
				altFormat: 'M j, Y',
				clickOpens: !this.readonly,
				mode: this.multipleDates ? 'multiple' : 'single'
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

	watch: {
		multipleDates(multipleDates) {
			if (!multipleDates) {
				let date = this.date;
				if (date && date.includes(';'))
					date = date.split(';')[0];

				this.$emit('input', { date });
			}
		},
		dateUnknown(dateUnknown) {
			if (dateUnknown)
				this.$emit('input', { date: 'Unknown' });
			else if (this.date === 'Unknown')
				this.$emit('input', { date: null });
		}
	},

	components: {
		ListItem,
		VueFlatpickr
	}
};
</script>

<style scoped>
	.checkbox-label-container {
		padding: 0 -5px;
	}

	.checkbox-label {
		font-weight: normal;
		margin: 0 5px;
	}
</style>
