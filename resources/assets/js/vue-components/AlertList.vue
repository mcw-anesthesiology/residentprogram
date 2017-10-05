<template>
	<section>
		<bootstrap-alert v-for="(alert, index) of value" :key="index"
			v-bind="alert"
			dismissable
			@close="removeAlert(index)" />
	</section>
</template>

<script>
import BootstrapAlert from './BootstrapAlert.vue';

export default {
	props: {
		value: {
			type: Array,
			required: true
		}
	},
	methods: {
		removeAlert(index){
			let alerts = this.value.slice();
			alerts.splice(index, 1);
			this.$emit('input', alerts);
		}
	},
	components: {
		BootstrapAlert
	}
};
</script>
