<template>
	<span class="php-date-interval">{{ display }}</span>
</template>

<script>
export default {
	props: {
		value: {
			type: Object,
			required: true
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
		display() {
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
	}
};
</script>

<style scoped>
	.php-date-interval {
		white-space: pre;
	}
</style>
