<template>
	<button :class="computedClass" :title="computedTitle" :disabled="computedDisabled">
		<slot v-if="processing" name="processing">
			<svg-icon :svg="ring" />
		</slot>
		<slot v-else></slot>
	</button>
</template>

<script>
import SvgIcon from './SvgIcon.vue';

import ring from '../../../../public/img/ring.svg';

export default {
	props: {
		processing: {
			type: Boolean,
			default: false
		},
		// title: {
		// 	type: String,
		// 	required: false
		// },
		processingTitle: {
			type: String,
			default: 'Processing...'
		},
		// class: {
		// 	type: [String, Object],
		// 	required: false
		// },
		processingClass: {
			type: [String, Object],
			required: false
		}
	},
	data() {
		return {
			ring
		};
	},
	computed: {
		computedClass() {
			if (this.processing)
				return this.processingClass;
			// return this.processing
			// 	? this.processingClass
			// 	: this.class;
		},
		computedTitle() {
			if (this.processing)
				return this.processingTitle;
			// return this.processing
			// 	? this.processingTitle
			// 	: this.title;
		},
		computedDisabled() {
			if (this.processing)
				return true;
		}
	},
	components: {
		SvgIcon
	}
};
</script>
