<template>
	<div class="col-md-2 text-center">
		<input v-bind:type="type" disabled/>
		<input type="text" v-bind:value="text"
			class="form-input form-option form-option-text form-control"
			placeholder="Option Text"
			v-on:input="$emit('input', {text: $event.target.value})"
			v-on:change="$emit('change', {text: $event.target.value})"
			v-on:focus="$emit('focus', 'text')"
			/>
		<input v-bind:type="type === 'radio' ? 'number' : 'text'"
			v-bind:value="value"
			class="form-input form-option form-option-value form-control"
			placeholder="Option Value"
			v-on:input="$emit('input', {value: $event.target.value})"
			v-on:change="$emit('change', {value: $event.target.value})"
			v-on:focus="$emit('focus', 'value')"
			/>
		<textarea v-bind:value="description"
			class="form-input form-option form-option-description form-control"
			placeholder="Hover Description"
			v-on:input="$emit('input', {description: $event.target.value})"
			v-on:change="$emit('change', {description: $event.target.value})"
			v-on:focus="$emit('focus', 'description')"
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
		'description'
	]
}
</script>
