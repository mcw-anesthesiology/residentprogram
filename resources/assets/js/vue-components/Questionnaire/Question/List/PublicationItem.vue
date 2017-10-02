<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="validation.errors" prop="title">
			<label class="containing-label">
				Title of publication
				<textarea class="form-control"
					:value="title" :readonly="readonly"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="author">
			<label class="containing-label">
				Primary author(s)
				<textarea class="form-control"
					:value="author" :readonly="readonly"
					@input="$emit('input', {author: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="link">
			<label class="containing-label">
				Link (PubMed, MCW FCD, etc.)
				<input type="text" class="form-control"
					:value="link" :readonly="readonly"
					@input="$emit('input', {link: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="role">
			<label class="containing-label">
				Your role on the project
				<textarea class="form-control"
					:value="role" :readonly="readonly"
					@input="$emit('input', {role: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { publicationListItem as validate } from 'modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	model: {
		prop: 'text'
	},
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'publication';
			}
		},
		title: {
			type: String,
			default: ''
		},
		author: {
			type: String,
			default: ''
		},
		link: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		validation() {
			return validate(this);
		}
	},

	components: {
		ListItem
	}
};
</script>
