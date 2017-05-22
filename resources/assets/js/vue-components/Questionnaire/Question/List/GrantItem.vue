<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div class="form-group" v-if="type === 'grantOther'">
			<label class="containing-label">
				Funding agency
				<input type="text" class="form-control"
					:value="agency"
					@input="$emit('input', {agency: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Project
				<input type="text" class="form-control"
					:value="project"
					@input="$emit('input', {project: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Funding amount
				<div class="input-group">
					<span class="input-group-addon">$</span>
					<input type="number" class="form-control"
						:value="amount"
						@input="$emit('input', {amount: Number($event.target.value)})" />
				</div>
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
				return [
					'grant',
					'grantOther'
				].includes(type);
			}
		},
		agency: {
			type: String,
			default: ''
		},
		project: {
			type: String,
			default: ''
		},
		amount: {
			type: Number,
			default: 0
		}
	},

	components: {
		ListItem
	}
};
</script>
