<template>
	<bootstrap-alert v-if="validation && !validation.valid">
		<p>
			{{ errors.length }} error{{ errors.length !== 1 ? 's': '' }}
			on current page
		</p>
		<button type="button" class="btn btn-danger"
				@click="scrollToError">
			Scroll to error
		</button>
	</bootstrap-alert>
</template>

<script>
import BootstrapAlert from 'vue-components/BootstrapAlert.vue';
import { section as validate, flattenErrors } from 'modules/merits/validate.js';

import { getHeaderHeight } from 'modules/dom-utils.js';

export default {
	props: {
		page: {
			type: Object,
			required: true
		}
	},

	computed: {
		validation() {
			return validate(this.page);
		},
		errors() {
			if (!this.validation)
				return [];

			return flattenErrors(this.validation.errors);
		}
	},

	methods: {
		scrollToError() {
			$('.invalid-container').first().parents('.checklist-item')
				.velocity('scroll', {
					offset: -1 * getHeaderHeight()
				});
		}
	},

	components: {
		BootstrapAlert
	}
};
</script>

<style scoped>
	.alert {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
