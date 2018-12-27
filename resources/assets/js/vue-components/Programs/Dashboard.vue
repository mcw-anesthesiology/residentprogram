<template>
	<div class="container body-block">
		<h1>Programs</h1>

		<vue-tabs>
			<v-tab v-for="program of programs" :key="program.id" :title="program.name">
				<dashboard-program :program="program" :dates="dates" />
			</v-tab>
		</vue-tabs>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { VueTabs, VTab } from 'vue-nav-tabs';

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
		VueTabs,
		VTab,
		DashboardProgram
	}
};
</script>
