<template>
	<button type="button" href="#" class="btn btn-default" :disabled="active"
			@click="emitPage">
		{{ text || value + 1 }}
	</button>
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
		emitPage(){
			if(!this.active)
				this.$emit('click', this.value);
		}
	}
};
</script>
