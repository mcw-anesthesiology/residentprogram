<template>
	<img :src="imgSrc" @error="useFallback = true" />
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			required: true
		},
		fallback: {
			type: String,
			default: '/img/avatar.png'
		}
	},
	data() {
		return {
			useFallback: false
		};
	},
	computed: {
		imgSrc() {
			return this.useFallback
				? this.fallback
				: this.src;
		}
	}
};
</script>
