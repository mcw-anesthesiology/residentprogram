<template>
	<div class="container body-block">
		<h1>Programs</h1>

		<div class="program" v-for="program of programs">
			<h2>{{ program.name }}</h2>

			<evaluation-list :evaluations="program.evaluations"></evaluation-list>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import EvaluationList from '@/vue-components/EvaluationList.vue';

export default {
	mounted() {
		this.$store.dispatch('programs/fetch').then(() => {
			this.$store.dispatch('programs/fetchAllEvaluations');
		});
	},
	computed: {
		...mapGetters('programs', {
			programs: 'withEvaluations'
		})
	},
	components: {
		EvaluationList
	}
};
</script>
