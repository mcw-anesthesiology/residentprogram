<template>
	<div ref="container"></div>
</template>

<script>
import { renderCaseLogDetailsSchema } from 'modules/case-log-details-schema.js';

export default {
	props: {
		schema: {
			type: Array,
			required: true
		},
		responses: {
			type: Array,
			required: true
		}
	},

	mounted() {
		this.renderDetails();
	},

	methods: {
		renderDetails() {
			renderCaseLogDetailsSchema(this.schema, this.responses, this.$refs.container);
		}
	}
};
</script>
