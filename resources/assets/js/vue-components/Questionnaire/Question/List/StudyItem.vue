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
				Study title
				<textarea class="form-control"
					:value="title"
					:readonly="isReadonly('title')"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="role"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Your role in study
				<textarea class="form-control"
					:value="role"
					:readonly="isReadonly('role')"
					@input="$emit('input', {role: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group prop="primaryInvestigator"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				<input type="checkbox"
					:checked="primaryInvestigator"
					:disabled="isReadonly('primaryInvestigator')"
					@input="$emit('input', {primaryInvestigator: $event.target.checked})" />
				Primary investigator
			</label>
		</validated-form-group>
		<validated-form-group prop="yearInitiated"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Year initiated
				<input type="text" class="form-control"
					:value="yearInitiated"
					:readonly="isReadonly('yearInitiated')"
					@input="$emit('input', {yearInitiated: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="approvalNumber"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Approval number (IRB / ACUC)
				<input type="text" class="form-control"
					:value="approvalNumber"
					:readonly="isReadonly('approvalNumber')"
					@input="$emit('input', {approvalNumber: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group prop="progress"
				:errors="validation.errors"
				:show-errors="showErrors"
				:invalid-class="helpClass">
			<label class="containing-label">
				Progress
				<textarea class="form-control"
					:value="progress"
					:readonly="isReadonly('progress')"
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
		primaryInvestigator: {
			type: Boolean,
			default: false
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
