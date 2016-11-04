<template>
	<label class="btn btn-info"
			:class="{active: value === option}"
			@click="$emit('input', option)">
		<input :type="type" :value="option" />
		<slot></slot>
	</label>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'radio',
			validator(value){
				return [
					'radio',
					'checkbox'
				].includes(value);
			}
		},
		option: {
			type: String,
			required: true
		},
		value: {
			required: true
		}
	}
};
</script>
