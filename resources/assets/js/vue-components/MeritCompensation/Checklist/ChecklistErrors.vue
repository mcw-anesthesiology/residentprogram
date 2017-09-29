<template>
	<bootstrap-alert v-if="!pagesValid">
		<strong>Checklist errors</strong>
		<ul>
			<li v-for="(errors, pageNum) of pageErrors" v-if="errors.length > 0">
				{{ errors.length }} error{{ errors.length === 1 ? '' : 's' }}
				on page {{ pageNum + 1 }}.
				<button type="button" class="btn btn-default"
						@click="$emit('navigate', pageNum)">
					Go to page
				</button>
			</li>
		</ul>
	</bootstrap-alert>
</template>

<script>
import BootstrapAlert from 'vue-components/BootstrapAlert.vue';

import { section as validatePage, flattenErrors } from 'modules/merits/validate.js';

export default {
	props: {
		pages: {
			type: Array,
			required: true
		}
	},

	computed: {
		pageValidations() {
			if (!this.pages)
				return [];

			return this.pages.map(validatePage);
		},
		pagesValid() {
			return this.pageValidations.every(validation => validation.valid);
		},
		pageErrors() {
			return this.pageValidations.map(validation => flattenErrors(validation.errors));
		}
	},

	components: {
		BootstrapAlert
	}
};
</script>
