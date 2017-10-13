<template>
	<list-item :readonly="readonly"
			:invalid="!validation.valid"
			:show-errors="showErrors"
			@remove="$emit('remove')">
		<validated-form-group v-if="type === 'grantOther'"
				:errors="validation.errors" prop="agency">
			<label class="containing-label">
				Funding agency
				<input type="text" class="form-control"
					:value="agency" :readonly="readonly"
					@input="$emit('input', {agency: $event.target.value})" />
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="project">
			<label class="containing-label">
				Project
				<textarea class="form-control"
					:value="project" :readonly="readonly"
					@input="$emit('input', {project: $event.target.value})">
				</textarea>
			</label>
		</validated-form-group>
		<validated-form-group :errors="validation.errors" prop="amount">
			<label class="containing-label">
				Funding amount
				<div class="input-group">
					<span class="input-group-addon">$</span>
					<input type="number" class="form-control"
						:value="amount" :readonly="readonly"
						@input="$emit('input', {amount: Number($event.target.value)})" />
				</div>
			</label>
		</validated-form-group>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

import { grantListItem as validate } from '@/modules/questionnaire/validate.js';

export default {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return [
					'grant',
					'grantOther'
				].includes(type);
			}
		},
		agency: {
			type: String,
			default: ''
		},
		project: {
			type: String,
			default: ''
		},
		amount: {
			type: Number,
			default: 0
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
