<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !work}">
			<label class="containing-label">
				{{ workLabel }}
				<textarea class="form-control"
					:value="work" :readonly="readonly"
					@input="$emit('input', {work: $event.target.value})">
				</textarea>
			</label>
			<span v-if="!work" class="help-block">
				Please enter the name of what's being reviewed or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !reviews}">
			<label class="containing-label">
				{{ reviewsLabel }}
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
				return type === 'review';
			}
		},
		work: {
			type: String,
			default: ''
		},
		reviews: {
			type: Number,
			default: 0
		},
		labels: {
			type: Object,
			required: false
		}
	},

	computed: {
		workLabel() {
			return (this.labels && this.labels.work)
				? this.labels.work
				: "What's being reviewed";
		},
		reviewsLabel() {
			return (this.labels && this.labels.reviews)
				? this.labels.reviews
				: 'Number of reviews';
		}
	},

	components: {
		ListItem
	}
};
</script>
