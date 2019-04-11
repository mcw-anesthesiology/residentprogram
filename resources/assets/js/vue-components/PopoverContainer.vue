<template>
	<dialog open>
		<slot></slot>
	</dialog>
</template>

<style scoped>
	dialog {
		border: 1px solid #666;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		border-radius: 3px;
		padding: 2em 3em;
	}
</style>
