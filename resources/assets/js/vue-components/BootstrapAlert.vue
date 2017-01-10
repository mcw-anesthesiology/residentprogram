<template>
	<div class="alert" :class="alertTypeClass">
		<button type="button" class="close" aria-label="Close"
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
			required: true,
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
		}
	},
	computed: {
		alertTypeClass(){
			if(this.type === 'error')
				return 'alert-danger';
			
			return `alert-${this.type}`
		}
	}
};
</script>
