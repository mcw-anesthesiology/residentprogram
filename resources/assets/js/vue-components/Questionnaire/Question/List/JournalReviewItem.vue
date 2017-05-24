<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !journal}">
			<label class="containing-label">
				Journal
				<input type="text" class="form-control"
					:value="journal" :readonly="readonly"
					@input="$emit('input', {journal: $event.target.value})" />
			</label>
			<span v-if="!journal" class="help-block">
				Please enter the journal name or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !reviews}">
			<label class="containing-label">
				Number of reviews
				<input type="number" class="form-control"
					:value="reviews" :readonly="readonly"
					@input="$emit('input', {reviews: Number($event.target.value)})" />
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
				return type === 'journalReview';
			}
		},
		journal: {
			type: String,
			default: ''
		},
		reviews: {
			type: Number,
			default: 0
		}
	},

	components: {
		ListItem
	}
};
</script>
