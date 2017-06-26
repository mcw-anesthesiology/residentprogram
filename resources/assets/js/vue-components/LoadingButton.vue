<template>
	<span>
		<button v-if="loading" class="btn" :class="loadingClass" title="Loading" disabled>
			<svg-icon src="/img/ring.svg" />
		</button>
		<slot v-else></slot>
	</span>
</template>

<script>
import SvgIcon from './SvgIcon.vue';

export default {
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		loadingClass: {
			type: [String, Object],
			required: false
		}
	},
	components: {
		SvgIcon
	}
};
</script>
