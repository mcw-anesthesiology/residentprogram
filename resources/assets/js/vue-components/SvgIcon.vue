<template>
	<span class="svg-icon" v-html="svg"></span>
</template>

<script>

export default {
	props: {
		src: {
			type: String,
			required: true
		}
	},
	data(){
		return {
			svg: null
		};
	},
	created(){
		fetch(this.src).then(response => {
			if(response.ok)
				return response.text();

			throw new Error('Unable to load icon');
		}).then(svg => {
			this.svg = svg;
		}).catch(err => {
			console.error(err.message);
		});
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
