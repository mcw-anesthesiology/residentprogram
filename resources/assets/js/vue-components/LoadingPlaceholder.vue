<template>
	<div class="loading-placeholder">
		<LoaderIcon />
		Loading...
	</div>
</template>

<style scoped>

.loading-placeholder {
	padding: 2em;
	text-align: center;
}

.loading-placeholder >>> .feather-loader {
	vertical-align: middle;
	animation-duration: 1.5s;
	animation-name: rotate-loading-placeholder;
	animation-iteration-count: infinite;
}

@keyframes rotate-loading-placeholder {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>

<script>
import { LoaderIcon } from 'vue-feather-icons';

export default {
	components: {
		LoaderIcon
	}
};
</script>
