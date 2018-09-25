import Vue from '@/vue-constructors/index.js';
import { mapGetters } from 'vuex';

import store from '@/vue-constructors/store.js';

import EvaluationTypeBlock from '@/vue-components/Dashboard/EvaluationTypeBlock.vue';

new Vue({
	el: 'main',
	store,
	data() {
		return {
			msg: 'hey'
		};
	},
	computed: {
		...mapGetters('evaluations/subject', {
			subjectEvaluations: 'list'
		}),
		...mapGetters('evaluations/evaluator', {
			evaluatorEvaluations: 'list'
		})
	},
	mounted() {
		this.$store.dispatch('evaluations/subject/fetch');
		this.$store.dispatch('evaluations/evaluator/fetch');
	},
	components: {
		EvaluationTypeBlock
	}
});
