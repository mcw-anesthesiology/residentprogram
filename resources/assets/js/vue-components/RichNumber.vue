<template>
	<span :style="styleValue">
		{{ valueToDisplay }}
	</span>
</template>

<script>
import Color from 'color';

import transformColor from '@jacobmischka/transform-color';

export default {
	props: {
		value: {
			type: Number,
			required: true
		},
		displayValue: {
			type: String,
			required: false
		},
		min: {
			type: Number,
			default: -1
		},
		max: {
			type: Number,
			default: 1
		},
		minColor: {
			type: [
				String,
				Object
			],
			default: 'red'
		},
		midColor: {
			type: [
				String,
				Object
			],
			default: 'black'
		},
		maxColor: {
			type: [
				String,
				Object
			],
			default: 'green'
		}
	},

	computed: {
		valueToDisplay() {
			return this.displayValue
				? this.displayValue
				: this.value;
		},
		mid() {
			return ((this.max + this.min) / 2);
		},
		endColor() {
			return this.value >= this.mid
				? this.maxColor
				: this.minColor;
		},
		maxTransformedValue() {
			if (this.mid === 0)
				return this.max;

			return ((this.max - this.mid) / this.mid);
		},
		transformedValue() {
			return this.value / this.maxTransformedValue;
		},

		color() {
			if (this.value <= this.min)
				return Color(this.minColor);
			if (this.value === this.mid)
				return Color(this.midColor);
			if (this.value >= this.max)
				return Color(this.maxColor);

			return transformColor(this.midColor, this.endColor, this.transformedValue);
		},

		styleValue() {
			return {
				color: this.color.rgb().string()
			};
		}
	}
};
</script>
