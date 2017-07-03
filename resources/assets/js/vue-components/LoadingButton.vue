<template>
	<span ref="loadingContainer" v-tooltip="tooltipOptions">
		<button v-if="loading" class="btn" :class="loadingClass" title="Loading" disabled>
			<svg-icon src="/img/ring.svg" />
		</button>
		<slot v-else></slot>
	</span>
</template>

<script>
import { VTooltip } from 'v-tooltip';

import SvgIcon from './SvgIcon.vue';

export default {
	directives: {
		tooltip: VTooltip
	},
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		loadingClass: {
			type: [String, Object],
			required: false
		},
		successful: {
			type: Boolean,
			default: false
		},
		tooltip: {
			type: String,
			default: 'Done!'
		},
		tooltipTimeout: {
			type: Number,
			default: 3000
		}
	},

	computed: {
		tooltipOptions() {
			return {
				content: this.tooltip,
				trigger: 'manual'
			};
		}
	},

	watch: {
		loading(loading, oldLoading) {
			if (!loading && oldLoading && this.successful) {
				this.$refs.loadingContainer._tooltip.show();
				window.setTimeout(() => {
					this.$refs.loadingContainer._tooltip.hide();
				}, this.tooltipTimeout);
			}
		}
	},

	components: {
		SvgIcon
	}
};
</script>
