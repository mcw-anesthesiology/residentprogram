<template>
	<button type="button" class="btn btn-default" @click="handleClick">
		<slot>Print</slot>
	</button>
</template>

<script>
/** @format */

import { printElement } from '@/modules/utils.js';

export default {
	props: {
		target: {
			type: [HTMLElement, String],
			required: true
		},
		filename: {
			type: String,
			default: 'download.pdf'
		},
		landscape: {
			type: Boolean,
			required: false
		},
		options: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	computed: {
		pdfOptions() {
			return {
				landscape: this.landscape,
				...this.options
			};
		}
	},
	methods: {
		handleClick() {
			const target =
				typeof this.target === 'string'
					? document.querySelector(this.target)
					: this.target;

			return printElement(target, this.filename, this.pdfOptions);
		}
	}
};
</script>
