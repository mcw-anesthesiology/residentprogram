<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !title}">
			<label class="containing-label">
				Lecture title
				<input type="text" class="form-control"
					:value="title" :readonly="readonly"
					@input="$emit('input', {title: $event.target.value})" />
			</label>
			<span v-if="!title" class="help-block">
				Please enter the lecture title or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !date}">
			<label class="containing-label">
				Lecture date
				<vue-flatpickr class="form-control"
					:options="flatpickrOptions"
					:value="date"
					@input="$emit('input', {date: arguments[0]})" />
			</label>
			<span v-if="!date" class="help-block">
				Please enter the lecture date or remove this list item
			</span>
		</div>
		<div v-if="type !== 'audienceLecture'"
				class="form-group" :class="{'has-warning': !audience}">
			<label class="containing-label">
				Lecture audience (department, society, group, location, etc.)
				<input type="text" class="form-control"
					:value="audience" :readonly="readonly"
					@input="$emit('input', {audience: $event.target.value})" />
			</label>
			<span v-if="!audience" class="help-block">
				Please enter the lecture audience or remove this list item
			</span>
		</div>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';
import VueFlatpickr from 'vue-flatpickr';
import 'vue-flatpickr/theme/flatpickr.min.css';

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
				altInputClass: 'form-control appear-not-readonly',
				altFormat: 'M j, Y'
			};
		}
	},

	components: {
		ListItem,
		VueFlatpickr
	}
};
</script>
