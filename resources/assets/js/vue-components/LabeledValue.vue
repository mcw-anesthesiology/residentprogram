<template>
	<div class="labeled-value">
		<small>{{ label }}</small>
		<slot></slot>
	</div>
</template>

<style>
.labeled-value {

}

small {
	font-size: 0.8em;
	color: rgba(0, 0, 0, 0.75);
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
