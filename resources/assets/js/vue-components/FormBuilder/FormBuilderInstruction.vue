<template>
	<div class="container-fluid form-instruction-block form-block">
		<div class="row">
			<div class="col-md-10">
				<label>Instruction block</label> <small>Supports <a href="http://daringfireball.net/projects/markdown/basics" target="_blank">markdown</a> (except inline HTML)</small>
				<textarea v-bind:value="text" v-on:input="$emit('change', {text: $event.target.value})" class="form-control form-instruction-text" required></textarea>
			</div>
			<div class="col-md-1 col-md-offset-1">
				<button v-on:click="$emit('remove')" class="form-block-delete btn btn-danger del-btn" type="button">Delete</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		'text'
	],
	data(){
		return {

		};
	},
	methods: {
		onInput(event){
			this.$emit('input', event.target.value);
		}
	}
};
</script>
