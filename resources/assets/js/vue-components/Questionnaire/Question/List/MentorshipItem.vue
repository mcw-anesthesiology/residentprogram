<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" :class="{'has-warning': !mentee}">
			<label class="containing-label">
				Mentee name
				<input type="text" class="form-control"
					:value="board" :readonly="readonly"
					@input="$emit('input', {mentee: $event.target.value})" />
			</label>
			<span v-if="!mentee" class="help-block">
				Please enter the mentee / trainee name or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !subject}">
			<label class="containing-label">
				Project / program / mentorship subject
				<input type="text" class="form-control"
					:value="subject" :readonly="readonly"
					@input="$emit('input', {subject: $event.target.value})" />
			</label>
			<span v-if="!subject" class="help-block">
				Please enter the mentorship subject or remove this list item
			</span>
		</div>
	</list-item>
</template>

<script>
import ListItem from './Item.vue';

return {
	extends: ListItem,
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'mentorship';
			}
		},
		mentee: {
			type: String,
			default: ''
		},
		subject: {
			type: String,
			default: ''
		}
	},

	components: {
		ListItem
	}
};
</script>
