<template>
	<div class="container body-block">
		<h2>Mentees</h2>

		<div class="list-group">
			<mentee-list-item v-for="mentee of mentees" :key="mentee.id"
				v-bind="mentee" :evaluations="getDateRangeEvaluations(mentee.id)" />
		</div>
	</div>
</template>

<style scoped>
</style>

<script>
// TODO: Fetch evaluations only for individual mentees when requested

import { mapState } from 'vuex';

import MenteeListItem from './ListItem.vue';

export default {
	props: {
		dates: {
			type: Object,
			required: true
		}
	},
	mounted() {
		this.fetchEvaluations();
	},
	computed: {
		...mapState('mentorships', [
			'mentees',
			'menteeEvaluations'
		])
	},
	watch: {
		dates() {
			this.fetchEvaluations();
		}
	},
	methods: {
		fetchEvaluations() {
			this.$store.dispatch('mentorships/fetchEvaluations', this.dates);
		},
		getDateRangeEvaluations(menteeId) {
			return this.$store.getters['mentorships/dateRangeEvaluations'](menteeId, this.dates);
		}
	},
	components: {
		MenteeListItem
	}
};
</script>
