<template>
	<list-item :readonly="readonly" @remove="$emit('remove')">
		<div v-if="type === 'grantOther'" class="form-group"
				:class="{'has-warning': !agency}">
			<label class="containing-label">
				Funding agency
				<input type="text" class="form-control"
					:value="agency" :readonly="readonly"
					@input="$emit('input', {agency: $event.target.value})" />
			</label>

			<span v-if="!agency" class="help-block">
				Please enter the funding agency or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !project}">
			<label class="containing-label">
				Project
				<textarea class="form-control"
					:value="project" :readonly="readonly"
					@input="$emit('input', {project: $event.target.value})">
				</textarea>
			</label>

			<span v-if="!project" class="help-block">
				Please enter the name of the project or remove this list item
			</span>
		</div>
		<div class="form-group" :class="{'has-warning': !amount}">
			<label class="containing-label">
				Funding amount
				<div class="input-group">
					<span class="input-group-addon">$</span>
					<input type="number" class="form-control"
						:value="amount" :readonly="readonly"
						@input="$emit('input', {amount: Number($event.target.value)})" />
				</div>
			</label>

			<span v-if="!amount" class="help-block">
				Please enter the funding amount or remove this list item
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
