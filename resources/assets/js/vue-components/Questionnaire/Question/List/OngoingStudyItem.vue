<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !title}">
			<label class="containing-label">
				Study title
				<input type="text" class="form-control"
					:value="title" :readonly="readonly"
					@input="$emit('input', {title: $event.target.value})" />
			</label>

			<span v-if="!title" class="help-block">
				Please enter the study title or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !role}">
			<label class="containing-label">
				Your role in study
				<input type="text" class="form-control"
					:value="role" :readonly="readonly"
					@input="$emit('input', {role: $event.target.value})" />
			</label>

			<span v-if="!role" class="help-block">
				Please describe your role or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !approvalNumber}">
			<label class="containing-label">
				Approval number (IRB / ACUC)
				<input type="text" class="form-control"
					:value="approvalNumber" :readonly="readonly"
					@input="$emit('input', {approvalNumber: $event.target.value})" />
			</label>

			<span v-if="!approvalNumber" class="help-block">
				Please enter the study approval number or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !progress}">
			<label class="containing-label">
				Progress
				<textarea class="form-control"
					:value="progress" :readonly="readonly"
					@input="$emit('input', {progress: $event.target.value})">
				</textarea>
			</label>

			<span v-if="!progress" class="help-block">
				Please describe the study's progress or remove this list item
			</span>
		</div>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

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
		approvalNumber: {
			type: String,
			default: ''
		},
		progress: {
			type: String,
			default: ''
		}
	},

	components: {
		ListItem
	}
};
</script>
