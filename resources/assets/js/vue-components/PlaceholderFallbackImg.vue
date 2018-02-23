<template>
	<img :src="safeSrc" @error="useFallback = true" />
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
		safeSrc() {
			return this.useFallback
				? this.fallback
				: this.src;
		}
	}
};
</script>
