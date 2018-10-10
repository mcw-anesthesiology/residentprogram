<template>
	<div>
		<component :is="dashboard" :dates="dates" />
	</div>
</template>

<script>
import { mapState } from 'vuex';

import AdminDashboard from './AdminDashboard.vue';
import UserDashboard from './UserDashboard.vue';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapState(['user']),
		dashboard() {
			return this.user && this.user.type === 'admin' ? AdminDashboard : UserDashboard;
		}
	}
};
</script>
