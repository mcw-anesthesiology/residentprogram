<template>
	<span v-if="pre" class="php-date-interval-pre">
		{{ preDisplay }}
	</span>
	<span v-else class="php-date-interval">
		<span v-if="days" class="php-date-interval-unit">
			{{days}} {{pluralize('day', days)}}
		</span>
		<span v-if="days || hours" class="php-date-interval-unit">
			{{hours}} {{pluralize('hour', hours)}}
		</span>
		<span v-if="minutes" class="php-date-interval-unit">
			{{minutes}} {{pluralize('minute', minutes)}}
		</span>
	</span>
</template>

<script>
import { pluralize } from '@/modules/text-utils.js';

export default {
	props: {
		value: {
			type: Object,
			required: true
		},
		pre: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		days() {
			return this.value.days;
		},
		hours() {
			return this.value.h;
		},
		minutes() {
			return this.value.i;
		},
		thingsToDisplay() {
			return [
				'days',
				'hours',
				'minutes'
			];
		},
		preDisplay() {
			return this.thingsToDisplay
				.filter(thing => this[thing])
				.map(thing => {
					const val = this[thing];
					const unit = val === 1
						? thing.substring(0, thing.length - 1) + ' '
						: thing;

					return `${String(val).padStart(2)} ${unit}`;
				})
				.join('  ');
		}
	},
	methods: {
		pluralize
	}
};
</script>

<style scoped>
	.php-date-interval-pre {
		white-space: pre;
	}

	.php-date-interval-unit {
		margin: 0 0.1em;
		white-space: nowrap;
	}
</style>
