<template>
	<li class="text-list-item">
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
			<div :class="{'has-warning': !text}">
				<input type="text" class="form-control"
					:value="text" :readonly="readonly"
					@input="$emit('input', {text: $event.target.value})" />

				<span v-if="!text" class="help-block">
					Please complete or remove this list item
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
				return type === 'text';
			}
		},
		text: {
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
	.text-list-item {
		margin-bottom: 1em;
	}
</style>
