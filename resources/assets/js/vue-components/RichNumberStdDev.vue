<template>
	<rich-signed-number :value="stdDevs" :precision="precision" />
</template>

<script>
import RichSignedNumber from './RichSignedNumber.vue';

import { variance, standardDeviation, numberOfStandardDeviations } from 'modules/math-utils.js';

export default {
	props: {
		value: {
			type: Number,
			required: true
		},
		values: {
			type: Array,
			required: true
		},
		precision: {
			type: Number,
			default: 3
		}
	},

	computed: {
		stdDevs() {
			return numberOfStandardDeviations(this.value, this.values);
		},
		variance() {
			return variance(this.values);
		},
		standardDeviation() {
			return standardDeviation(this.values);
		}
	},

	components: {
		RichSignedNumber
	}
};
</script>
