<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div :class="{'has-warning': !text}">
			<textarea class="form-control"
				:value="text" :readonly="readonly"
				@input="$emit('input', {text: $event.target.value})">
			</textarea>

			<span v-if="!text" class="help-block">
				Please complete or remove this list item
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
		ListItem
	}
};
</script>
