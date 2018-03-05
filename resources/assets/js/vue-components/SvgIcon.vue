<template>
	<span class="svg-icon" v-html="svgContents"></span>
</template>

<script>
import { logError } from '@/modules/errors.js';

export default {
	props: {
		src: {
			type: String,
			required: false
		},
		svg: {
			type: String,
			required: false
		}
	},
	data(){
		return {
			fetchedSvg: null
		};
	},
	created(){
		this.fetchSvg();
	},
	computed: {
		svgContents() {
			return this.svg || this.fetchedSvg;
		}
	},
	watch: {
		svg(svg) {
			if (!svg)
				this.fetchSvg();
		}
	},
	methods: {
		fetchSvg() {
			if (this.svg || !this.src)
				return;

			fetch(this.src).then(response => {
				if(response.ok)
					return response.text();

				throw new Error('Unable to load icon');
			}).then(svg => {
				this.fetchedSvg = svg;
			}).catch(logError);
		}
	}
};
</script>

<style>
	.svg-icon,
	.svg-icon > svg {
		display: inline-block;
		width: 1em;
		height: 1em;
		stroke-width: 0;
		stroke: currentColor;
		fill: currentColor;
	}
</style>
