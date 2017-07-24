<template>
	<rich-number :value="value" :min="-0.5" :max="0.5"
		:display-value="displayString" />
</template>

<script>
import RichNumber from './RichNumber.vue';

export default {
	props: {
		value: {
			type: Number,
			required: true
		},
		precision: {
			type: Number,
			default: 3
		}
	},

	computed: {
		sign() {
			if (this.value > 0)
				return '+';
			else if (this.value < 0)
				return '-';
			return '';
		},
		absoluteValue() {
			return Math.abs(this.value);
		},
		precisionAbsoluteValue() {
			return this.absoluteValue.toPrecision(this.precision);
		},
		displayString() {
			return `${this.sign}${this.precisionAbsoluteValue}`;
		}
	},

	components: {
		RichNumber
	}
};
</script>
