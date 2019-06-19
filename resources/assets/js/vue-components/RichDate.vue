<template>
	<span class="rich-date" ref="container">
		{{ dateString }}
	</span>
</template>

<style scoped>
.rich-date {
	display: inline-block;
	break-inside: avoid;
}
</style>

<script>
import moment from 'moment';

import { renderDate, renderDateTime } from '@/modules/date-utils.js';

export default {
	props: {
		date: {
			type: [String, Date, Object],
			required: false
		},
		dates: {
			type: Array,
			required: false
		},
		time: {
			type: Boolean,
			default: false
		},
		detailed: {
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
		showDetailed() {
			return this.detailed || this.hover;
		},
		dateString() {
			if (this.date) {
				return this.getDateString(this.date);

			} else if (this.dates) {
				return this.dates.map(d => this.getDateString(d)).join('; ');
			}

			return '';
		}
	},

	methods: {
		handleMouseEnter() {
			this.hovered = true;
		},
		handleMouseLeave() {
			this.hovered = false;
		},
		getDateString(date) {
			if (!date || date === 'Unknown')
				return 'Unknown';

			try {
				if (this.time) {
					return this.showDetailed
						? moment(date).format('ll LT')
						: renderDateTime(date);
				}

				return this.showDetailed
					? moment(date).format('ll')
					: renderDate(date);
			} catch (err) {
				console.error(err);
				return 'Invalid date';
			}

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
