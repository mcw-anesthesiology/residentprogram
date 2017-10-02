<template>
	<div class="form-group" :class="{[invalidClass]: errors.has(prop)}">
		<slot></slot>
		<span v-if="showErrors && errors.has(prop)"
				class="help-block invalid-container">
			{{ errors.get(prop) }}
		</span>
	</div>
</template>

<script>
export default {
	props: {
		showErrors: {
			type: Boolean,
			default: true
		},
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
