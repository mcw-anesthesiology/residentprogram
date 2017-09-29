<template>
	<div class="form-group" :class="{[invalidClass]: errors.has(prop)}">
		<slot></slot>
		<span v-if="errors.has(prop)" class="help-block invalid-container">
			{{ errors.get(prop) }}
		</span>
	</div>
</template>

<script>
export default {
	props: {
		errors: {
			type: Map,
			required: true,
		},
		prop: {
			type: String,
			required: true
		},
		invalidClass: {
			type: String,
			default: 'has-error'
		}
	}
};
</script>
