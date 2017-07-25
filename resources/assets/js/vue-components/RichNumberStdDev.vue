<template>
	<rich-signed-number :value="stdDevs" :precision="precision" />
</template>

<script>
import RichSignedNumber from './RichSignedNumber.vue';

import { numberOfStandardDeviations } from 'modules/math-utils.js';

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
		}
	},

	components: {
		RichSignedNumber
	}
};
</script>
