<template>
	<div>
		<component :is="dashboard" :dates="dates" />
	</div>
</template>

<script>
import { mapState } from 'vuex';

import AdminDashboard from './AdminDashboard.vue';
import UserDashboard from './UserDashboard.vue';

import LoadingPlaceholder from '#/LoadingPlaceholder.vue';

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
			if (!this.user)
				return LoadingPlaceholder;

			return this.user.type === 'admin' ? AdminDashboard : UserDashboard;
		}
	}
};
</script>
