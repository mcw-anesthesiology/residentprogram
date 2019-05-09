<template>
	<div class="report-status">
		<bootstrap-alert v-if="saveSuccessful === false" type="error">
			<div class="text-center"></div>
			<p>
				Sorry, there was a problem submitting your changes.
			</p>

			<div v-if="savedLocally">
				<p>
					All of your changes have been saved locally to your web
					browser. Please reload the page to reestablish a connection
					to the system and save your changes.
				</p>
				<div class="text-center">
					<button type="button" class="btn btn-default btn-sm" @click="handleReload">
						Reload
					</button>
				</div>
			</div>
			<p v-else>
				Please contact {{ ADMIN_EMAIL }} before navigating away from this page
				to attempt recovery.
			</p>
		</bootstrap-alert>
		<bootstrap-alert v-else-if="saving" type="info">
			Saving...
		</bootstrap-alert>
		<bootstrap-alert v-else-if="unsaved" type="warning">
			<p>
				You have unsaved changes
				<button
					type="button"
					class="btn btn-info btn-xs unsaved-button"
					:disabled="saving"
					@click="$emit('save')"
				>
					{{ saving ? 'Saving...' : 'Save' }}
				</button>
			</p>
		</bootstrap-alert>
		<bootstrap-alert v-else type="success">
			<p>All changes saved successfully</p>
		</bootstrap-alert>
	</div>
</template>

<style scoped>
.report-status {
	text-align: center;
}
</style>

<script>
/** @format */
import BootstrapAlert from '#/BootstrapAlert.vue';

import { ADMIN_EMAIL } from '@/modules/constants.js';

export default {
	props: {
		unsaved: Boolean,
		saving: Boolean,
		saveSuccessful: Boolean,
		savedLocally: Boolean
	},
	data() {
		return {
			ADMIN_EMAIL
		};
	},
	components: {
		BootstrapAlert
	},
	methods: {
		handleReload() {
			window.location.reload();
		}
	}
};
</script>
