<template>
	<div class="alert" :class="alertTypeClass">
		<button v-if="dismissable" type="button" class="close" aria-label="Close"
				@click="$emit('close')">
			<span aria-hidden="true">&times;</span>
		</button>
		{{ text }}
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'error',
			validator(type){
				return [
					'info',
					'success',
					'warning',
					'error',
					'danger'
				].includes(type);
			}
		},
		text: {
			type: String,
			required: false
		},
		dismissable: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		alertTypeClass(){
			if(this.type === 'error')
				return 'alert-danger';
			
			return `alert-${this.type}`;
		}
	}
};
</script>
