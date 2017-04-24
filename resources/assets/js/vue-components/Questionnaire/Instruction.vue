<template>
	<div class="instruction-block">
		{{ markedUpText }}
	</div>
</template>

<script>
import snarkdown from 'snarkdown';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'instruction';
			}
		},
		text: {
			type: String,
			required: true
		}
	},
	
	computed: {
		markedUpText() {
			return snarkdown(this.text);
		}
	}
};
</script>

<style scoped>
	.instruction-block {
		margin: 1em;
		padding: 1em;
		font-size: 1.25em;
	}
</style>
