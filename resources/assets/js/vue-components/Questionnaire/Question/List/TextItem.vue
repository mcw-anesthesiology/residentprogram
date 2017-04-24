<template>
	<li>
		<input type="text" class="form-control appear-not-readonly"
			:value="text" :readonly="readonly"
			@input="$emit({text: $event.target.value})" />
	</li>
</template>

<script>
export default {
	model: {
		prop: 'text'
	},
	props: {
		type: {
			type: String,
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
	}
};
</script>
