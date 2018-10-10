<template>
	<div>

	</div>
</template>

<script>
import { mapState } from 'vuex';

import EvaluationList from '#/EvaluationList.vue';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	computed: {
	},
	components: {
		EvaluationList
	}
};
</script>
