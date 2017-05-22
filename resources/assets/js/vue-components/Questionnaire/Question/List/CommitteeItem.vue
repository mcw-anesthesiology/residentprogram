<template>
	<li class="committee-list-item">
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
			<div class="form-group">
				<label class="containing-label">
					Committee name
					<input type="text" class="form-control"
						:value="name" :readonly="readonly"
						@input="$emit('input', {name: $event.target.value})" />
				</label>
			</div>
			<div class="form-group">
				<fieldset>
					<legend>
						Your role
					</legend>
				</fieldset>
				<label v-for="value of ['chair', 'member']" class="containing-label">
					<input type="radio" :value="value"
						:checked="role === value"
						@change="$emit('input', {role: $event.target.value})" />
					{{ ucfirst(value) }}
				</label>
			</div>
		</div>
	</li>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';

import { ucfirst } from 'modules/utils.js';

export default {
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'committee';
			}
		},
		name: {
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

	methods: {
		ucfirst
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
