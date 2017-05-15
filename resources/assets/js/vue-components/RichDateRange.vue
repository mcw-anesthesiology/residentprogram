<template>
	<span ref="container">
		{{ dateString }}
	</span>
</template>

<script>
import { renderDateRange } from 'modules/date-utils.js';

export default {
	props: {
		date: {
			type: Object,
			required: true
		},
		start: {
			type: String,
			default: 'startDate'
		},
		end: {
			type: String,
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
			return this.date[this.start];
		},
		endDate() {
			return this.date[this.end];
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
