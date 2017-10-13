<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group :errors="validation.errors" prop="title">
			<label class="containing-label">
				Study title
				<textarea class="form-control"
					:value="title" :readonly="readonly"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="role">
			<label class="containing-label">
				Your role in study
				<textarea class="form-control"
					:value="role" :readonly="readonly"
					@input="$emit('input', {role: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="yearInitiated">
			<label class="containing-label">
				Year initiated
				<input type="text" class="form-control"
					:value="yearInitiated" :readonly="readonly"
					@input="$emit('input', {yearInitiated: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="approvalNumber">
			<label class="containing-label">
				Approval number (IRB / ACUC)
				<input type="text" class="form-control"
					:value="approvalNumber" :readonly="readonly"
					@input="$emit('input', {approvalNumber: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="progress">
			<label class="containing-label">
				Progress
				<textarea class="form-control"
					:value="progress" :readonly="readonly"
					@input="$emit('input', {progress: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { studyListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'study';
			}
		},
		title: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		yearInitiated: {
			type: String,
			default: ''
		},
		approvalNumber: {
			type: String,
			default: ''
		},
		progress: {
			type: String,
			default: ''
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
