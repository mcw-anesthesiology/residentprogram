<template>
	<div class="container body-block">
		<h1>Programs</h1>

		<dashboard-program v-for="program of programs" :key="program.id"
			:program="program" :dates="dates" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import DashboardProgram from './DashboardProgram.vue';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters('programs', {
			programs: 'withEvaluations'
		})
	},
	components: {
		DashboardProgram
	}
};
</script>
