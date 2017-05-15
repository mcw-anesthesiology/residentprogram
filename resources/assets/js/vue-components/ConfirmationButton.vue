<template>
	<button type="button" :class="currentClass" @click="handleClick">
		<slot v-if="pressed" name="pressed">
			<span class="glyphicon glyphicon-warning-sign"></span>
			Click again to confirm
		</slot>
		<slot v-else></slot>
	</button>
</template>

<script>
export default {
	props: {
		class: {
			type: String,
			required: false
		},
		unpressedClass: {
			type: String,
			required: false
		},
		pressedClass: {
			type: String,
			required: false
		},
		timeout: {
			type: Number,
			required: false,
			default: 3000
		}
	},
	data(){
		return {
			pressed: false
		};
	},

	computed: {
		currentClass(){
			return (this.pressedClass && this.pressed)
				? this.pressedClass
				: this.unpressedClass || this.class;
		}
	},

	methods: {
		handleClick(){
			if(this.pressed){
				this.$emit('click');
				this.pressed = false;
				if(this.pressedTimeout)
					clearTimeout(this.pressedTimeout);
			}
			else {
				this.pressed = true;
				this.pressedTimeout = setTimeout(() => {
					this.pressed = false;
				}, this.timeout);
			}
		}
	}
};
</script>
