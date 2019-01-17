<template>
	<span v-if="value" class="label" :class="labelClass">
		<slot name="icon">
			<span class="glyphicon glyphicon-ok"></span>
		</slot>
		<slot>
			Saved!
		</slot>
	</span>
</template>

<script>
export default {
	props: {
		value: Boolean,
		type: {
			type: String,
			default: 'success'
		},
		timeout: {
			type: Number,
			default: 2000
		}
	},
	data() {
		return {
			handle: null
		};
	},
	computed: {
		labelClass() {
			return `label-${this.type}`;
		}
	},
	watch: {
		value(value) {
			if (value) {
				if (this.handle) {
					clearTimeout(this.handle);
				}

				this.handle = setTimeout(() => {
					this.$emit('input', false);
				}, this.timeout);
			}
		}
	}
};
</script>
