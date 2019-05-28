<template>
	<button type="button" class="btn btn-default" @click="handleClick">
		<slot>Print</slot>
	</button>
</template>

<script>
/** @format */

import download from 'downloadjs';

import { logError } from '@/modules/errors.js';
import { PRINTER_ENDPOINT } from '@/modules/constants.js';

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
			const body = `<html><body><main>${
				target.outerHTML
			}</main></body></html>`;

			const styles = Array.from(document.styleSheets)
				.map(styleSheet => {
					if (styleSheet.href) {
						return { url: styleSheet.href };
					}

					try {
						return {
							content: Array.from(styleSheet.cssRules).reduce(
								(rules, rule) => rules + rule.cssText,
								''
							)
						};
					} catch (err) {
						console.error(err);
					}
				})
				.filter(Boolean);

			fetch(PRINTER_ENDPOINT, {
				method: 'POST',
				body: JSON.stringify({
					body,
					styles,
					options: this.pdfOptions
				})
			})
				.then(response => {
					if (response.ok) {
						return response.blob();
					}

					throw new Error(response.status);
				})
				.then(blob => {
					download(blob, this.filename, 'application/pdf');
				})
				.catch(err => {
					logError(err);
				});
		}
	}
};
</script>
