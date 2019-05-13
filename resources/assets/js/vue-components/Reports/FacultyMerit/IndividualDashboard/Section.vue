<style>
.individual-merit-dashboard-section {
	background: #fefefe;
	padding: 1em;
}

.individual-merit-dashboard-section h2 {
	margin-top: 0;
}
</style>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		periods: {
			type: Set,
			required: false
		}
	},
	computed: {
		multiplePeriods() {
			if (this.periods) {
				return this.periods.size > 1;
			}

			if (this.user.meritReports) {
				const periods = new Set(this.user.meritReports.map(mr => `${mr.period_start}:${mr.period_end}`));
				return periods.size > 1;
			}

			return false;
		}
	}
};
</script>
