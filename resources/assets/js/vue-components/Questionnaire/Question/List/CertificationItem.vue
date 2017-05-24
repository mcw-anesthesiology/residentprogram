<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !board}">
			<label class="containing-label">
				Board
				<input type="text" class="form-control"
					:value="board" :readonly="readonly"
					@input="$emit('input', {board: $event.target.value})" />
			</label>
			<span v-if="!board" class="help-block">
				Please enter the certifying board or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !specialty}">
			<label class="containing-label">
				Specialty
				<input type="text" class="form-control"
					:value="specialty" :readonly="readonly"
					@input="$emit('input', {specialty: $event.target.value})" />
			</label>
			<span v-if="!specialty" class="help-block">
				Please enter the certification specialty or remove this list item
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
