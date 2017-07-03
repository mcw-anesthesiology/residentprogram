<template>
	<li class="publication-list-item">
		<div class="item-controls">
			<confirmation-button v-if="!readonly" class="btn btn-sm"
					unpressed-class="btn-danger"
					pressed-class="btn-warning"
					@click="$emit('remove')">
				<span class="glyphicon glyphicon-remove"></span>
				Remove item
			</confirmation-button>
		</div>
		<div class="item-contents">
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
		</div>
	</li>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';

export default {
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
		ConfirmationButton
	}
};
</script>

<style scoped>
	li {
		display: flex;
	}

	.item-controls {
		flex-shrink: 0;
		padding: 1em 1em 1em 0;
	}

	.item-contents {
		flex-grow: 1;
	}
</style>

<style>
	.publication-list-item {
		margin-bottom: 2em;
	}
</style>
