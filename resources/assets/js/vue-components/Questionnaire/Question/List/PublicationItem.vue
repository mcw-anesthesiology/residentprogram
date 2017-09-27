<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !title}">
			<label class="containing-label">
				Title of publication
				<textarea class="form-control"
					:value="title" :readonly="readonly"
					@input="$emit('input', {title: $event.target.value})">
				</textarea>
			</label>
			<span v-if="!title" class="help-block">
				Please enter a title or remove this list item
			</span>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Primary author(s)
				<textarea class="form-control"
					:value="author" :readonly="readonly"
					@input="$emit('input', {author: $event.target.value})">
				</textarea>
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Link (PubMed, MCW FCD, etc.)
				<input type="text" class="form-control"
					:value="link" :readonly="readonly"
					@input="$emit('input', {link: $event.target.value})" />
			</label>
		</div>
		<div class="form-group" :class="{'has-warning': !role}">
			<label class="containing-label">
				Your role on the project
				<textarea class="form-control"
					:value="role" :readonly="readonly"
					@input="$emit('input', {role: $event.target.value})">
				</textarea>
			</label>
			<span v-if="!role" class="help-block">
				Please enter your role or remove this list item
			</span>
		</div>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

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

	components: {
		ListItem
	}
};
</script>
