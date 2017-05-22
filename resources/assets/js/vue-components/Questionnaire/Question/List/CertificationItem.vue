<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group">
			<label class="containing-label">
				Board
				<input type="text" class="form-control"
					:value="board"
					@input="$emit('input', {board: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Specialty
				<input type="text" class="form-control"
					:value="specialty"
					@input="$emit('input', {specialty: $event.target.value})" />
			</label>
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
				return type === 'certification';
			}
		},
		board: {
			type: String,
			default: ''
		},
		specialty: {
			type: String,
			default: ''
		}
	},

	components: {
		ListItem
	}
};
</script>
