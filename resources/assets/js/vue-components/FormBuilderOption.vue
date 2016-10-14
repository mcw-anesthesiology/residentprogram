<template>
	<div class="col-md-2 text-center" v-bind:class="{ 'working-option': isWorkingOption, 'is-focused': isFocused }">
		<input v-bind:type="type" disabled/>
		<input type="text" v-bind:value="text"
			class="form-input form-option form-option-text form-control"
			placeholder="Option Text"
			v-on:input="$emit('input', {text: $event.target.value})"
			v-on:change="$emit('change', {text: $event.target.value})"
			v-on:focus="handleInputFocus('text')"
			v-on:blur="handleInputBlur('text')"
			/>
		<input v-bind:type="type === 'radio' ? 'number' : 'text'"
			v-bind:value="value"
			class="form-input form-option form-option-value form-control"
			placeholder="Option Value"
			v-on:input="$emit('input', {value: $event.target.value})"
			v-on:change="$emit('change', {value: $event.target.value})"
			v-on:focus="handleInputFocus('value')"
			v-on:blur="handleInputBlur('value')"
			/>
		<textarea v-bind:value="description"
			class="form-input form-option form-option-description form-control"
			placeholder="Hover Description"
			v-on:input="$emit('input', {description: $event.target.value})"
			v-on:change="$emit('change', {description: $event.target.value})"
			v-on:focus="handleInputFocus('description')"
			v-on:blur="handleInputBlur('description')"
			>
		</textarea>
	</div>
</template>

<script>
export default {
	props: [
		'type',
		'text',
		'value',
		'description',
		'isWorkingOption'
	],
	data(){
		return {
			isFocused: false
		};
	},
	methods: {
		handleInputFocus(field){
			this.isFocused = true;
			this.$emit('focus', field);
		},
		handleInputBlur(field){
			this.isFocused = false;
			this.$emit('blur', field);
		}
	}
}
</script>

<style scoped>
	.working-option {
		opacity: 0.5;
	}

	.working-option:hover,
	.working-option.is-focused,
	.working-option:active {
		opacity: 1;
	}
</style>
