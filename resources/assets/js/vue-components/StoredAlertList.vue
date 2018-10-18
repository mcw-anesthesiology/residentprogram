<template>
	<section>
		<bootstrap-alert v-for="(alert, index) of alerts" :key="index"
			v-bind="alert"
			dismissable
			@close="removeAlert(alert)" />
	</section>
</template>

<script>
import { mapState } from 'vuex';

import BootstrapAlert from '#/BootstrapAlert.vue';

export default {
	computed: {
		...mapState(['alerts'])
	},
	methods: {
		removeAlert(alert) {
			this.$store.commit('removeAlert', alert);
		}
	},
	components: {
		BootstrapAlert
	}
};
</script>
