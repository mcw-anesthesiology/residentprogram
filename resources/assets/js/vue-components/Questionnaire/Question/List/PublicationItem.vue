<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			:removable="removable"
			@remove="removeItem">
		<validated-form-group prop="title"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Title of publication
				<textarea class="form-control"
					:value="title"
					:readonly="isReadonly('title')"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="author"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Primary author(s)
				<textarea class="form-control"
					:value="author"
					:readonly="isReadonly('author')"
					@input="$emit('input', {author: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="link"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Link (PubMed, MCW FCD, etc.)
				<input type="text" class="form-control"
					:value="link"
					:readonly="isReadonly('link')"
					@input="$emit('input', {link: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="role"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Your role on the project
				<textarea class="form-control"
					:value="role"
					:readonly="isReadonly('role')"
					@input="$emit('input', {role: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { publicationListItem as validate } from '@/modules/questionnaire/validate.js';

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
