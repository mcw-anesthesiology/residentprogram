<template>
	<button :class="computedClass" :title="computedTitle" :disabled="computedDisabled"
			@click="handleClick">
		<slot v-if="processing" name="processing">
			<svg-icon src="/img/ring.svg" />
		</slot>
		<slot v-else></slot>
	</button>
</template>

<script>
import SvgIcon from './SvgIcon.vue';

export default {
	props: {
		processing: {
			type: Boolean,
			default: false
		},
		processingTitle: {
			type: String,
			default: 'Processing...'
		},
		processingClass: {
			type: [String, Object],
			required: false
		}
	},
	computed: {
		computedClass() {
			if (this.processing)
				return this.processingClass;
		},
		computedTitle() {
			if (this.processing)
				return this.processingTitle;
		},
		computedDisabled() {
			if (this.processing)
				return true;
		}
	},
	methods: {
		handleClick(...args) {
			this.$emit('click', ...args);
		}
	},
	components: {
		SvgIcon
	}
};
</script>
