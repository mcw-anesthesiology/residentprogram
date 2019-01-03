<template>
	<div class="container body-block">
		Hello, world!

		<pre>{{ formScenarios }}</pre>
	</div>
</template>

<script>
import gql from 'graphql-tag';

export default {
	data() {
		return {
			formScenarios: []
		};
	},
	apollo: {
		formScenarios: gql`
			query {
				formScenarios {
					id
					form_id
					scenario_id
					scenario {
						intro
					}
				}
			}
		`
	}
};
</script>
