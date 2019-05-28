<template>
	<section class="individual-merit-dashboard-section individual-merit-dashboard-goals">
		<h2>Goals</h2>

		<ol>
			<goals-item heading="Faculty development" />
			<goals-item heading="Program development / Key initiatives" />
			<goals-item heading="Academic productivity" />
		</ol>

	</section>
</template>

<style scoped>
section {
	font-size: 1em;
}

ol {
	padding-left: 1em;
}
</style>

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
