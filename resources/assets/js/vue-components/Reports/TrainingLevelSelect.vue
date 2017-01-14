<template>
	<select :value="value" class="form-control"
			@input="$emit('input', $event.target.value)">
		<option value="all">All</option>
		<option value="intern">Intern</option>
		<option value="ca-1">CA-1</option>
		<option value="ca-2">CA-2</option>
		<option value="ca-3">CA-3</option>
		<option value="fellow">Fellow</option>
	</select>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			required: true
		}
	}
};
</script>
