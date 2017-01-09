<template>
	<span>
		<span v-if="active">
			{{ text || value + 1 }}
		</span>
		<a v-else href="#" @click="emitPage">
			{{ text || value + 1 }}
		</a>
	</span>
</template>

<script>
export default {
	props: {
		value: Number,
		text: {
			type: String,
			required: false
		},
		active: Boolean
	},
	methods: {
		emitPage(event){
			event.preventDefault();

			this.$emit('click', this.value);
		}
	}
};
</script>
