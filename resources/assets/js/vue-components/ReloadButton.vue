<template>
	<button type="button" class="reload-button btn btn-default" :class="{ clicked }" @click="handleClick">
		<refresh-cw-icon />
	</button>
</template>

<style scoped>
	.reload-button >>> .feather {
		vertical-align: middle;
		height: 1.5em;
		width: 1.5em;
	}

	.reload-button.clicked >>> .feather {
		animation-duration: 0.75s;
		animation-name: rotate-reload-button;
		animation-iteration-count: 1;
	}

	@keyframes rotate-reload-button {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>

<script>
import { RefreshCwIcon } from 'vue-feather-icons';

export default {
	data() {
		return {
			clicked: false
		};
	},
	methods: {
		handleClick() {
			this.$emit('click');
			this.clicked = true;
			window.setTimeout(() => {
				this.clicked = false;
			}, 1000);
		}
	},
	components: {
		RefreshCwIcon
	}
};
</script>
