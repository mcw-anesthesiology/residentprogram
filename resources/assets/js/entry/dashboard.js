import Vue from '@/vue-constructors/index.js';

import store from '@/vue-constructors/store.js';

import StartEndDate from '#/StartEndDate.vue';
import SubjectEvaluationsBlock from '#/Dashboard/SubjectEvaluationsBlock.vue';
import EvaluatorEvaluationsBlock from '#/Dashboard/EvaluatorEvaluationsBlock.vue';

import { isoDateStringObject, currentYear } from '@/modules/date-utils.js';

new Vue({
	el: 'main',
	store,
	data() {
		return {
			dates: isoDateStringObject(currentYear())
		};
	},
	computed: {
		subjectEvaluations() {
			return this.$store.getters['evaluations/subject/listBetween'](this.dates);
		},
		evaluatorEvaluations() {
			return this.$store.getters['evaluations/evaluator/listBetween'](this.dates);
		}
	},
	mounted() {
		this.fetchEvaluations();
	},
	watch: {
		dates() {
			this.fetchEvaluations();
		}
	},
	methods: {
		fetchEvaluations() {
			this.$store.dispatch('evaluations/subject/fetch', this.dates);
			this.$store.dispatch('evaluations/evaluator/fetch', this.dates);
		}
	},
	components: {
		StartEndDate,
		SubjectEvaluationsBlock,
		EvaluatorEvaluationsBlock
	}
});
