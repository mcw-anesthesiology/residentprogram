<template>
	<section class="individual-merit-dashboard-section individual-merit-dashboard-goals">
		<h2>Goals</h2>

		<ol>
			<goals-item heading="Faculty development" />
			<goals-item heading="Key indicators" />
			<goals-item heading="Academic productivity" />
		</ol>

	</section>
</template>

<script>
import DashboardSection from './Section.vue';

import GoalsItem from './GoalsItem.vue';

export default {
	extends: DashboardSection,
	components: {
		GoalsItem
	}
};
</script>
