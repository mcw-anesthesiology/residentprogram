<template>
	<span>
		<button type="button" v-if="!pressed" :class="defaultClass"
				@click="pressed = true">
			<slot></slot>
		</button>
		
		
		<template v-else>
			<button type="button" :class="yesClass"
					@click="handleConfirm">
				<slot name="yes">
					<span class="glyphicon glyphicon-thumbs-up"></span>
				</slot>
			</button>
			<button type="button" :class="noClass"
					@click="pressed = false">
				<slot name="no">
					<span class="glyphicon glyphicon-thumbs-down"></span>
				</slot>
			</button>
		</template>
	</span>
</template>

<script>
export default {
	props: {
		defaultClass: {
			type: String,
			required: false
		},
		yesClass: {
			type: String,
			required: false
		},
		noClass: {
			type: String,
			required: false
		}
	},
	data(){
		return {
			pressed: false
		};
	},
		
	methods: {
		handleConfirm(){
			this.$emit('click');
			this.pressed = false;
		}
	}
};
</script>
