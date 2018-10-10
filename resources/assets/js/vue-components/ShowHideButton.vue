<template>
	<button type="button" class="btn" @click="handleClick">

		<slot name="left-glyph"></slot>

		<slot v-if="value" name="true">
			Hide
		</slot>
		<slot v-else name="false">
			Show
		</slot>

		<slot>
			{{ text }}
		</slot>

		<slot name="glyph">
			<span class="glyphicon"
				:class="value ? 'glyphicon-collapse-up' : 'glyphicon-expand'">
			</span>
		</slot>
	</button>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			required: true
		},
		text: {
			type: String,
			required: false
		}
	},
	methods: {
		handleClick(event) {
			event.preventDefault();

			this.$emit('input', !this.value);
		}
	}
};
</script>

<style scoped>
	@media print {
		button {
			display: none;
		}
	}
</style>
