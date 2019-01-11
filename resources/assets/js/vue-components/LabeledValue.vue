<template>
	<div class="labeled-value">
		<small>{{ label }}</small>
		<slot></slot>
	</div>
</template>

<style scoped>
.labeled-value {

}

small {
	font-size: 0.9em;
	color: rgba(0, 0, 0, 0.65);
	display: block;
	margin-bottom: 1em;
}
</style>

<script>
export default {
	props: {
		label: String
	}
};
</script>
