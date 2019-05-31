<template>
	<span class="rich-date-range" ref="container">
		{{ dateString }}
	</span>
</template>

<style scoped>
.rich-date-range {
	display: inline-block;
	break-inside: avoid;
}
</style>

<script>
import { renderDateRange } from '@/modules/date-utils.js';

export default {
	props: {
		dates: {
			type: [Object, Array],
			required: true
		},
		start: {
			type: [String, Number],
			default: 'startDate'
		},
		end: {
			type: [String, Number],
			default: 'endDate'
		},
		time: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			hovered: false
		};
	},

	mounted() {
		this.$refs.container.addEventListener('mouseenter',
			this.handleMouseEnter);

		this.$refs.container.addEventListener('mouseleave',
			this.handleMouseLeave);
	},

	computed: {
		startDate() {
			return this.dates[this.start];
		},
		endDate() {
			return this.dates[this.end];
		},
		dateString() {
			return renderDateRange(this.startDate, this.endDate, this.hovered);
		}
	},

	methods: {
		handleMouseEnter() {
			this.hovered = true;
		},
		handleMouseLeave() {
			this.hovered = false;
		}
	},

	beforeDestroy() {
		this.$refs.container.removeEventListener('mouseenter',
			this.handleMouseEnter);

		this.$refs.container.removeEventListener('mouseleave',
			this.handleMouseLeave);
	}
};
</script>

<style scoped>
	span {
		cursor: help;
	}
</style>
